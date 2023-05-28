import express from 'express'
import { login, loginwithgoogle, Signup } from '../controllers/auth.js';

var router=express.Router();

// Signup
router.post("/signup" ,Signup);

// login2
router.post("/login",login );

// google
router.post("/google",loginwithgoogle);

export default router; 