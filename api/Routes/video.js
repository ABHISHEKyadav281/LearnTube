import express from 'express'
import { addVideo, addview,  chanel,  deleteVideo,  dislike,  getVideo, getbytag, like, randoms, search, sub, test1, trend, uv } from '../controllers/video.js';
import { verify } from '../Verify.js';

const router=express.Router();

router.get("/test" ,test1);

router.post("/",addVideo);

// router.put("/find/:id",updateVideo);

router.post("/:id",deleteVideo);
router.get("/chanel/:id",chanel);


router.post("/sub/:id",sub);

router.get("/view/:id",addview);

router.get("/find/:id",getVideo);

router.get("/uv/:id",uv);

router.get("/random",randoms);

router.get("/trend",trend);

// reconemtation
router.get("/tags",getbytag);

router.get("/search",search);

router.post("/like/:videoId",like)

router.post("/dislike/:videoId",dislike)


export default router;