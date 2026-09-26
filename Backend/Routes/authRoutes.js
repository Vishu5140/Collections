import express from 'express';
import protect from '../Middleware/authMiddleware.js';
import  {registerUser, loginUser , getUsers,adminCreate, DeleteUser, SingleUser} from '../Controller/authController.js';
import admin from "../Middleware/adminMiddleware.js"
const router=express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/adminCreate',adminCreate);
router.get('/getAll',protect,admin,getUsers);
router.delete('/deleteUser/:id',protect,DeleteUser);
router.get('/singleData/:id',protect,admin,SingleUser)
export default router;