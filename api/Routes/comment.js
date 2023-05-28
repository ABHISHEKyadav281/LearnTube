import express from 'express'
import { addComment, deleteComment, getComment, test2 } from '../controllers/comment.js';
import { verify } from '../Verify.js';

const router=express.Router();
router.get("/test" ,test2);

router.post("/:idd", addComment)
router.delete("/:id", verify, deleteComment)
router.get("/:videoId", getComment)

export default router;