import User from "../models/User.js";

export const getPrinter = async (req, res) => {
  try {
    const { facultyId } = req.user;
    const printers = await User.find({ role: "printer", facultyId }).select(
      "-password"
    );

    if (!printers) {
      return res.status(404).json({
        success: false,
        message: "No Printer not found",
        printers: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Printers fetched successfully",
      printers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const { departmentId } = req.user;
    const teachers = await User.find({ role: "teacher", departmentId }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSubAdmins = async (req, res) => {
  try {
    const { role } = req.user;
    let id;
    let userRole;
    let key;
    if (role === "admin") {
      id = req.user.facultyId;
      userRole = "admin";
      key = "facultyId";
    } else {
      id = req.user.departmentId;
      userRole = "department";
      key = "departmentId";
    }

    const subAdmins = await User.find({
      role: userRole,
      [key]: id,
      isSubAdmin: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "SubAdmins fetched successfully",
      subAdmins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
