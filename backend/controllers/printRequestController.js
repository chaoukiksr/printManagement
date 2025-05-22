import PrintRequest from "../models/PrintRequest.js";
import Department from "../models/Department.js";

// Create print request (for teachers)
export const createPrintRequest = async (req, res) => {
    try {
        const { type, quantity, description } = req.body;
        const file = req.file ? req.file.path : null;

        const userDepartment = await Department.findById(req.user.departmentId);
        if(!userDepartment){
            return res.status(404).json({
                success: false,
                message: "Your Department has been deleted, please contact the admin"
            });
        }
        
        // Get user info from auth middleware
        const printRequest = await PrintRequest.create({
            user: {
                id: req.user._id,
                name: req.user.username,
                image: req.user.image
            },
            departmentId: req.user.departmentId,
            departmentName: userDepartment.name,
            facultyId: userDepartment.facultyId,
            type,
            quantity,
            description,
            file,
            status: "pending"
        });

        res.status(201).json({
            success: true,
            message: "Print request created successfully",
            data: printRequest
        });
    } catch (error) {
        console.error("Create print request error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating print request",
            error: error.message
        });
    }
};

// Update print request (for teachers)
export const updatePrintRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, quantity, description } = req.body;
        const file = req.file ? req.file.path : undefined;
        const removeFile = req.body.removeFile === 'true';

        const printRequest = await PrintRequest.findById(id);

        if (!printRequest) {
            return res.status(404).json({
                success: false,
                message: "Print request not found"
            });
        }

        // Check if user is the owner
        if (printRequest.user.id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this request"
            });
        }

        // Check if status allows updates
        if (["wf_printer", "wf_teacher", "completed", "refused"].includes(printRequest.status)) {
            return res.status(400).json({
                success: false,
                message: "Cannot update request in current status"
            });
        }

        const updateData = { type, quantity, description };
        
        // Handle file updates
        if (file) {
            updateData.file = file;
        } else if (removeFile) {
            updateData.file = null;
        }

        const updatedRequest = await PrintRequest.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Print request updated successfully",
            data: updatedRequest
        });
    } catch (error) {
        console.error("Update print request error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating print request",
            error: error.message
        });
    }
};

// Update status (for department and printer)
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const printRequest = await PrintRequest.findById(id);

        if (!printRequest) {
            return res.status(404).json({
                success: false,
                message: "Print request not found"
            });
        }

        // Validate status transitions based on user role
        if (req.user.role === "department") {
            if (!["refused", "wf_printer"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status for department"
                });
            }
            // Verify department ownership
            if (printRequest.departmentId.toString() !== req.user.departmentId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to update this request"
                });
            }
        } else if (req.user.role === "printer") {
            if (!["wf_teacher", "completed"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status for printer"
                });
            }
            // Verify printer's faculty matches request's faculty
            if (printRequest.facultyId.toString() !== req.user.facultyId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to update this request"
                });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update status"
            });
        }

        const updatedRequest = await PrintRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: updatedRequest
        });
    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating status",
            error: error.message
        });
    }
};

// Delete print request
export const deletePrintRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const printRequest = await PrintRequest.findById(id);

        if (!printRequest) {
            return res.status(404).json({
                success: false,
                message: "Print request not found"
            });
        }

        // Check if user is the owner
        if (printRequest.user.id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this request"
            });
        }

        // Check if status allows deletion
        if (["wf_printer", "wf_teacher", "completed", "refused"].includes(printRequest.status)) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete request in current status"
            });
        }

        await PrintRequest.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Print request deleted successfully"
        });
    } catch (error) {
        console.error("Delete print request error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting print request",
            error: error.message
        });
    }
};

// Get print requests with filtering
export const getPrintRequests = async (req, res) => {
    try {
        const query = {};

        // Filter by department if user is from department
        if (req.user.role === "department") {
            query.departmentId = req.user.departmentId;
        }
        // Filter by faculty if user is admin or printer
        else if (["admin", "printer"].includes(req.user.role)) {
            query.facultyId = req.user.facultyId;
            
            // For printer, only show specific statuses
            if (req.user.role === "printer") {
                query.status = { $in: ["wf_printer", "wf_teacher", "completed"] };
                
                // Filter for today's requests
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                query.createdAt = {
                    $gte: today,
                    $lt: tomorrow
                };
            }
        }
        // Filter by user if teacher
        else if (req.user.role === "teacher") {
            query["user.id"] = req.user._id;
        }

        // Filter by status if provided (only if not printer)
        if (req.query.status && req.user.role !== "printer") {
            query.status = req.query.status;
        }

        const printRequests = await PrintRequest.find(query)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Print requests fetched successfully",
            results: printRequests.length,
            data: printRequests
        });
    } catch (error) {
        console.error("Get print requests error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching print requests",
            error: error.message
        });
    }
};
