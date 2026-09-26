import OrderMod from "../Model/OrderModel.js";
import sendEmail from "../utils/sendEmail.js";
const createOrder=async(req,res)=>{
  try{
     const { id, formData } = req.body;
    console.log("BODY:", req.body);

    const {
      fullName,
      address,
      phone,
      city,
      state,
      pincode,
      price,
      quantity,
      totalPrice
    } = formData;


      const NewOrder = new OrderMod({
      userId: req.user.id,
      productId: id,
      quantity,
      price,
      totalPrice,

      address: [
        {
          name: fullName,
          city,
          localadd:address,
          phone:phone,
          state,
          pincode,
        }
      ],

      status: "shipped"
    });
    await NewOrder.save();
    const message=`
Hi ${fullName},

Your order has been created successfully!

Best regards,
The Our Website Team
`;
    const emailInfo=await sendEmail(req.user.email,'order created',message);
    res.status(200).json({
        Success:true,
        message:"order created successfully",
        order:NewOrder,
        mailid:emailInfo.messageId
    })
  }catch(error){
    res.status(500).json({"error in order creation":error.message})
  }
};
//getALLOrders by user
const getAllOrder=async(req,res)=>{
 try{
    const userId=req.user.id;
    console.log(userId);
    const findOrders=await OrderMod.find({userId}).populate('userId','name email').populate('productId','name price imageUrl');
    if(!findOrders || findOrders.length===0)
    {
        return res.status(404).json({message:"no orders found"});
    }
    res.status(200).json({Success:true,orders:findOrders})
 }catch(error){
    res.status(500).json({"error in getting orders":error.message})
 }
};
// by admin
const getUserOrders = async (req, res) => {
  try {
    const {id} = req.params;
     const userId=id;
    console.log("Selected user:", userId);

    const findOrders = await OrderMod.find({ userId })
      .populate("userId", "name email")
      .populate("productId", "name price imageUrl");

    if (findOrders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this user"
      });
    }

    res.status(200).json({
      success: true,
      orders: findOrders
    });

  } catch (error) {
    res.status(500).json({
      "error in getting orders": error.message
    });
  }
};
//Myorder
const getMyOrder=async (req,res)=>{
   try{
    const {id}=req.params;
     const getOrder=await OrderMod.findById(id);
     if(!getOrder || getOrder.length===0)
     {
        return res.status(404).json({message:"no orders found"});
     }
        res.status(200).json({Success:true,order:getOrder})
   }
   catch(error){    
        res.status(500).json({"error in getting specific user orders":error.message})

}
};

export { createOrder, getAllOrder, getMyOrder,getUserOrders};