import mongoose from 'mongoose'
const OrderSchema=new mongoose.Schema({
     // which user placed order
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
     },
     // products included in order
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
            
                min:1
            },
            price:{
                type:Number,
                
            },
     totalPrice:{
        type:Number,
        
     },
     address:[
        {
        name:{
            type:String,
             required:true
        },
        localadd:{
            type:String,
        },
        phone:{
            type:Number,
        },
        city:{  type:String,
             required:true
            },
        state:{  type:String,
             required:true
            },
        pincode:{
                type:Number,
            }
        }
     ],
    status:{
        type:String,
        enum:['pending','shipped','deleivered'],
        default:'pending'
        }
},{
    timestamps:true
})
const OrderMod=mongoose.model('Order',OrderSchema);
export default OrderMod;