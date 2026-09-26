import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema({
    // userId:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"User"
    // },
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:String
    },
    stock:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    reviews:{
        type:Number,
        default:0
    },
     createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
});
const ProductMod=mongoose.model('Product',ProductSchema);
export default ProductMod;