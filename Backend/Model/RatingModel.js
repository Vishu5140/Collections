import mongoose from "mongoose";
const RateSchema=new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
},{
    timestamps:true
})
  const RateMod=mongoose.model('Rate',RateSchema);
  export default RateMod;