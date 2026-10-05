// import nodemailer from "nodemailer";
// const sendEmail=async(to,subject,message)=>{
//    try{
//      const transporter=nodemailer.createTransport(
//         {
//             service:'Gmail',
//             auth:{
//                 user:process.env.EMAIL_USER,
//                 pass:process.env.EMAIL_PASS
//             }
//         }
//     );
//     const mailOptions={
//         from:process.env.EMAIL_USER,
//         to:to,
//         subject:subject,
//         text:message
//     }
//    const info= await transporter.sendMail(mailOptions);
//    return info;
//    }catch(err)
//    {
//     console.log("error in email sending",err)
//    }
// }
// export default sendEmail;