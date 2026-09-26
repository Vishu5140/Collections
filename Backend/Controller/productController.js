import ProductMod from "../Model/ProductModel.js";
import cloudinary from "../config/cloudinary.js";
const Adproduct=async(req,res)=>{
   try{
    const {name,description,price,category,stock,imageUrl}=req.body;
    if(!name || !description || !price || !category || !stock )
    {
        return res.status(404).json({
            Success:false,
            message:"fill all the details"
        })
    }
    // let imageUrl='';
    // console.log("req.file",req.file);
    // if(req.file)
    // {
    //     const result=await cloudinary.uploader.upload(req.file.path);
    //     imageUrl=result.secure_url;
    // }
    // create product
    const newProduct=new ProductMod({
        name:name,
        description:description,
        price:price,
        category:category,
        stock:stock,
        imageUrl:imageUrl
    })
    await newProduct.save();
    res.status(200).json({
            Success:true,
            message:"product created",
            product:newProduct
        })
   }catch(error)
   {
     res.status(500).json({
            Success:false,
            error:error.message,
            message:" error in add new product "
        })
   }
}
// update product
const upproduct=async(req,res)=>{
   try{
     const {name,description,price,category,stock}=req.body;
    const {id}=req.params;
    console.log(id);
    const existProduct=await ProductMod.findById(id);
    if(!existProduct)
    {
        return res.status(404).json({
            Success:false,
            message:"product not found"
        })
    }
    existProduct.name=name ||  existProduct.name;
    existProduct.description=description ||  existProduct.description;
    existProduct.price=price || existProduct.price;
    existProduct.category=category  ||  existProduct.category;
    existProduct.stock=stock ||  existProduct.stock;
    // console.log("update req file",req.file);
    // if(req.file)
    // {
    //     const result=await cloudinary.uploader.upload(req.file.path);
    //     console.log("update section result",result);
    //     existProduct.imageUrl=result.secure_url;
    //  }
     await existProduct.save();
     res.status(200).json({
        Success:true,
        message:"product updated successfuly",
        updatedProduct:existProduct
     })
   }catch(error)
   {
    res.status(500).json({
        Success:false,
        error:error.message,
        message:"product updation error",
     })
   }
}
// delete product
const deleteProduct=async(req,res)=>{
try{
    const {id}=req.params;
const existUser=await ProductMod.findById(id);
if(!existUser)
{
    return res.status(404).json({
        Success:false,
        message:"product not find for deletion"
     })
}
  await  existUser.deleteOne();
  res.status(200).json({
        Success:true,
        message:"product deleted"
     })
}catch(error)
{
    res.status(500).json({
        Success:false,
        error:error.message,
        message:"product deletion error"
     })
}
};

// getAll
const getAll=async(req,res)=>{
  try{
     const findAll=await ProductMod.find();
   if(!findAll)
   {
    return res.status(404).json({
        Success:false,
        message:"not found any product"
    })  }
  res.status(200).json({
    Success:true,
    message:"find all products",
    products:findAll
  })
  }catch(error){
     return res.status(500).json({
        Success:false,
        error:error.message,
        message:"error in getting all products"
    }) 
  }
};
// get one product
const getOne=async(req,res)=>{
   try{
    const{id}=req.params;
   const findSingle=await ProductMod.findById(id);
   if(!findSingle)
   {
    return res.status(404).json({
    Success:false,
    message:"this product not find"
  })
   }
   res.status(200).json({
    Success:true,
    message:"find single product",
    product:findSingle
  })
   }catch(error)
   {
    res.status(500).json({
    Success:false,
    message:"find error to singlr product by id",
    error:error.message
  })
   }
}
// getAll by admin
const GetApro=async(req,res)=>{
    try{
        const GetAll=await ProductMod.find();
        if(!GetAll)
        {
            return res.status(404).json({
          Success:false,
         message:"not find all product for admin",
          error:error.message
  }) }

   res.status(200).json({
    Success:true,
    products:GetAll,
    message:"get all for admin",
  })
    }catch(error)
    {
      res.status(500).json({
    Success:false,
    error:error.message
  })
    }
}
export  {Adproduct,upproduct,deleteProduct,getAll,getOne,GetApro};