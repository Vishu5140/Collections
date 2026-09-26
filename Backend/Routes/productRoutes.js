import express from "express";
import {Adproduct, deleteProduct, upproduct,getAll,getOne, GetApro } from "../Controller/productController.js";
const router=express.Router();
import multer from "multer";
import protect from "../Middleware/authMiddleware.js";
import admin from "../Middleware/adminMiddleware.js";
const upload=multer({dest:'uploads/'});
router.post('/adproduct',protect,admin,Adproduct);// for admin
router.get('/getApro',protect,admin,GetApro);// for admin
router.put('/updateproduct/:id',protect,admin,upproduct);// for admin
router.delete('/deleteproduct/:id',protect,admin,deleteProduct);// for admin
router.get('/getAll',protect,getAll);// for user
router.get('/getOne/:id',protect,getOne);// for user

export default router;