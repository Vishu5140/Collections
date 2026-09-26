import UserMod from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import router from "../Routes/authRoutes.js";
const registerUser=async(req,res)=>{
   try{
    const{name,email,password}=req.body;
   // check all fields
   if(!name || !email || !password)
   {
    return res.status(404).json({
        Success:false,
        message:"fill the details"
    })
   }
   // check exixt user
   const userExist=await UserMod.findOne({email});
   if(userExist)
   {
    return res.status(404).json({
        Success:false,
        message:"user already have registered"
    })
   }
   //hashpassword
   const salt=await bcrypt.genSalt(10);
   const hashpassword=await bcrypt.hash(password,salt);
   //create new user
   const newUser=new UserMod({
     name:name,
     email:email,
     password:hashpassword
   })
   await newUser.save();
   // create msg for email
   const subject="Welcome to Our Website! 🎉";
  const message = `
Hello ${name},

🎉 Welcome to Our Website!

We’re excited to have you with us!

Your account has been successfully created, and you can now start exploring everything our website has to offer.

━━━━━━━━━━━━━━━━━━━━━━

👤 Account Details
Email: ${email}

━━━━━━━━━━━━━━━━━━━━━━

Thank you for joining our community. We look forward to having you with us!

If you have any questions or need assistance, feel free to reach out to our support team.

Best regards,
✨ The Our Website Team

Thank you for choosing us! ❤️
`;
// send email
const emailinfo=await sendEmail(email,subject,message);
console.log("user registered")// remove after complete 
res.status(200).json({
    Success:true,
    message:"user have registered",
    user:newUser,
    mailid:emailinfo.messageId
})
   }catch(error)
   {
    res.status(500).json({
    Success:false,
    message:`error in registration-${error.message}`,
})
   }
};
// login user
const loginUser=async(req,res)=>{
   try{
    const{email,password}=req.body;
   // check all fields
   if( !email || !password)
   {
    return res.status(404).json({
        Success:false,
        message:"fill the details"
    })
   }
   // check exist user
   const userExist=await UserMod.findOne({email});
   if(!userExist)
   {
    return res.status(404).json({
        Success:false,
        message:"user not registered"
    })
   }
   //check password using jwt
   const isMatch= await bcrypt.compare(password,userExist.password);
   // if password is incorrect and send email
   if (!isMatch) {
    const subject = "Password Verification Failed";

    const message = `
Hello ,

We noticed an unsuccessful login attempt on your account.

The password entered during the login attempt was incorrect.

If this was you, you can simply try logging in again with the correct password.

If you did not attempt to log in, we recommend changing your password to keep your account secure.

Best regards,
🔐 The Our Website Security Team
`;

    await sendEmail(email, subject, message);

    return res.status(401).json({
        Success: false,
        message: "Incorrect password"
    });
}

   // create token
   const token=jwt.sign({id:userExist._id,role:userExist.role,email:userExist.email},process.env.TOKEN_SECRET);
      res.status(200).json({
      Success:true,
      message:"logging successful",
      role:userExist.role,
      name:userExist.name,
      id:userExist._id,
      token:token
})
   }catch(error)
   {
    res.status(500).json({
    Success:false,
    error:error.message,
    message:"error in login ",
})
   }
};
// get All users by admin
const getUsers=async(req,res)=>{
   try{
   const findAll=await UserMod.find({role:"user"});

    res.status(200).json({
    Success:true,
     message:"get all users successfully ",
    users:findAll
})
   
   }catch(error)
   {
    res.status(500).json({
    Success:false,
    error:error.message,
    message:"error in getall users ",
})
   }
};
// admin-login
const adminCreate=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name || !email ||  !password)
        {
            return  res.status(404).json({
    Success:false,
    error:error.message,
    message:"complete all fields",
})}
    
 const existUser=await UserMod.findOne({email:email});
 // if user exist
 if(existUser)
 {
  return  res.status(409).json({
    Success:false,
    message:"user exist",
   })
 }
 const salt=await bcrypt.genSalt(10);
 const hashpassword=await bcrypt.hash(password,salt);
 // create admin
  const Creatadmin=new UserMod({
     name:name,
     email:email,
     password:hashpassword,
     role:"admin"
  })
   await Creatadmin.save();
    res.status(200).json({
    Success:true,
    admin:Creatadmin,
    message:"admin created",
})
    }catch(error){
        res.status(500).json({
    Success:false,
    error:error.message,
    message:"error in admin login",
})
    }
}

// delete User by admin
const DeleteUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const IsExist=await UserMod.findById(id);
        if(! IsExist)
        {
            return res.status(404).json({
                Success:false,
                message:"user not exist"
            })
        }
          await IsExist.deleteOne();
       return res.status(200).json({
                Success:true,
                message:"user  deleted by admin"
            })
    }catch(error){
        res.status(500).json({
            Success:false,
            error:error.message,
            message:"error to delete  user by admin"
        })
    }
}
// get A single user detail by admin
const SingleUser=async(req,res)=>{
   try{
     const {id}=req.params;
    const IsExist=await UserMod.findById(id);
    if(!IsExist)
    {
        return res.status(404).json({
            Success:false,
            message:"Not exist user"
        })
    }
      res.status(200).json({
            Success:true,
            user:IsExist,
            message:"User Find"
        })
   }catch(error){
    res.status(500).json({
            Success:false,
            message:error.message
        })
   }
}
export {registerUser,loginUser,getUsers,adminCreate,DeleteUser,SingleUser};