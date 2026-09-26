import jwt from "jsonwebtoken";
const protect=async(req,res,next)=>{
   try{
    const authHeader=req.headers.authorization;
   if(!authHeader)
   {
    return res.status(404).json({
        Success:false,
        message:"authHeader not receive"
    })
   }
   const token=authHeader.split(" ")[1];
   const decode=await jwt.verify(token,process.env.TOKEN_SECRET);
    console.log(decode);
    req.user=decode;
    next();
   }catch(error)
   {
    return res.status(500).json({
      Success: false,
      message: "Invalid or expired token",
    });
   }
}
export default protect;