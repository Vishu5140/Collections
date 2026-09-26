import express from 'express';
const router=express.Router();
import {createOrder, getUserOrders} from '../Controller/orderController.js';
import {getAllOrder,getMyOrder} from '../Controller/orderController.js';
import protect from '../Middleware/authMiddleware.js';
import CheckUser from '../Middleware/CheckUserMiddleware.js';
import admin from "../Middleware/adminMiddleware.js";
router.post('/Adorder',protect,CheckUser,createOrder);
router.get('/Myorder/:id',protect,getMyOrder);// for user
// router.put('/upStatus/:id',upDateStatus);
router.get('/getorders',protect,getAllOrder);// for user
router.get('/admin/getorders/:id',protect,admin,getUserOrders);// for admin

export default router;