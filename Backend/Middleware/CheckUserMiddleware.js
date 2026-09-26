const CheckUser=async(req,res,next)=>{
    try {
    if (req.user.role === "user") {
      return next();
    }

    return res.status(403).json({
      Success: false,
      message: "Access denied. User only",
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: "Error in checkuser middleware",
    });
  }
}
export default CheckUser;