import PrintRequest from "../models/PrintRequest.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

// Create print request (for teachers)
export const createPrintRequest = catchAsync(async (req, res, next) => {
    const { type, quantity, description, file } = req.body;
    
    // Get user info from auth middleware
    const printRequest = await PrintRequest.create({
        user: {
            id: req.user._id,
            name: req.user.name,
            image: req.user.image
        },
        departmentId: req.user.departmentId,
        type,
        quantity,
        description,
        file,
        status: "pending"
    });

    res.status(201).json({
        status: "success",
        data: printRequest
    });
});

// Update print request (for teachers)
export const updatePrintRequest = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { type, quantity, description, file } = req.body;

    const printRequest = await PrintRequest.findById(id);

    if (!printRequest) {
        return next(new AppError("Print request not found", 404));
    }

    // Check if user is the owner
    if (printRequest.user.id.toString() !== req.user._id.toString()) {
        return next(new AppError("You are not authorized to update this request", 403));
    }

    // Check if status allows updates
    if (["wf_printer", "wf_teacher"].includes(printRequest.status)) {
        return next(new AppError("Cannot update request in current status", 400));
    }

    const updatedRequest = await PrintRequest.findByIdAndUpdate(
        id,
        { type, quantity, description, file },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        status: "success",
        data: updatedRequest
    });
});

// Update status (for department and printer)
export const updateStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const printRequest = await PrintRequest.findById(id);

    if (!printRequest) {
        return next(new AppError("Print request not found", 404));
    }

    // Validate status transitions based on user role
    if (req.user.role === "department") {
        if (!["refused", "wf_printer"].includes(status)) {
            return next(new AppError("Invalid status for department", 400));
        }
    } else if (req.user.role === "printer") {
        if (!["wf_teacher", "completed"].includes(status)) {
            return next(new AppError("Invalid status for printer", 400));
        }
    } else {
        return next(new AppError("Unauthorized to update status", 403));
    }

    const updatedRequest = await PrintRequest.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        status: "success",
        data: updatedRequest
    });
});

// Delete print request
export const deletePrintRequest = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const printRequest = await PrintRequest.findById(id);

    if (!printRequest) {
        return next(new AppError("Print request not found", 404));
    }

    // Check if user is the owner
    if (printRequest.user.id.toString() !== req.user._id.toString()) {
        return next(new AppError("You are not authorized to delete this request", 403));
    }

    // Check if status allows deletion
    if (["wf_printer", "wf_teacher"].includes(printRequest.status)) {
        return next(new AppError("Cannot delete request in current status", 400));
    }

    await PrintRequest.findByIdAndDelete(id);

    res.status(204).json({
        status: "success",
        data: null
    });
});

// Get print requests with filtering
export const getPrintRequests = catchAsync(async (req, res, next) => {
    const query = {};

    // Filter by department if user is from department
    if (req.user.role === "department") {
        query.departmentId = req.user.departmentId;
    }

    // Filter by user if teacher
    if (req.user.role === "teacher") {
        query["user.id"] = req.user._id;
    }

    // Filter by status if provided
    if (req.query.status) {
        query.status = req.query.status;
    }

    const printRequests = await PrintRequest.find(query)
        .sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: printRequests.length,
        data: printRequests
    });
});
