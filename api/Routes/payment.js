
import express  from 'express';
import { payorder, payverify } from '../controllers/payment.js';



const router=express.Router();
router.post("/order",payorder)
router.post("/verify",payverify)

export default router;