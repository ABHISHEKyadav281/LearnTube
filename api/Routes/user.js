import express from 'express'
import {  deleteUser, getFollowing, getUser,  subscribe, test, unsubscribe } from '../controllers/user.js';
import {verify} from '../Verify.js'


const router=express.Router();

router.get("/test" ,test);

// router.put("/:id",verify,update)

router.post("/:id",deleteUser)

router.get("/follow/:id",getFollowing)

router.get("/find/:id",getUser)

router.post("/sub/:id",subscribe)

router.post("/unsub/:id",unsubscribe)



export default router;