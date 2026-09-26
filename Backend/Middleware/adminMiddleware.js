const admin = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      Success: false,
      message: "Access denied. Admin only",
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: "Error in admin middleware",
    });
  }
};

export default admin; 