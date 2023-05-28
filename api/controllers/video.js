
import { log } from 'console';
import User from '../models/Users.js';
import Video from '../models/Videos.js'

export const test1=()=>{
    console.log("test1")
}


export const addVideo=async(req,res,next)=>{
    const newVideo=await Video.create(req.body);
    const user = await User.findById(newVideo.userId);
    console.log(user)
    try {
        const saveVideo=await newVideo.save();
         user.videoId.push(saveVideo._id);
        await user.save();
        res.status(200).json("saved video");
    } catch (err) {
        next(err);
    }
}

export const deleteVideo=async(req,res,next)=>{
    try {
           await Video.findOneAndDelete({_id:req.params.id});
           res.status(200).json("video deleted");
        }   
     catch (err) {
        next(err);
    } 
}
export const chanel=async(req,res,next)=>{
    try {
         let chanell=  await User.findById(req.params.id).populate("videoId");
           res.status(200).json(chanell);console.log(chanell);
        }   
     catch (err) {
        next(err);
    } 
}

// export const updateVideo=async(req,res,next)=>{
//     try {
//         let u=await Video.findOne(req.params.id);
//         if(u){
//             if(req.params.id===u.id){
//            let uv= await Video.findOneAndUpdate(req.params.id,{set:req.body},{new:true});
          
//            res.status(200).json(uv)}
//            else{
//             res.json("onle owner can update");
//            }
//         }
//         else{
//             res.json("no video found")
//         }
        
//     } catch (err) {
//         next(err);
//     }
// }

export const getVideo=async(req,res,next)=>{
    try {
    const newVideo1=await Video.findById(req.params.id);
        res.status(200).json(newVideo1);
    } catch (err) {
        next(err);
    }
}
// your video
export const uv=async(req,res,next)=>{
    try {
    const newVideo1=await Video.find({userId:req.params.id}).populate("userId");
        res.status(200).json(newVideo1);
        // console.log(newVideo1,"uv")
    } catch (err) {
        next(err);
    }
}

export const addview=async(req,res,next)=>{
    try {
     await Video.findByIdAndUpdate(req.params.id,{$inc:{views:+1}});
        res.status(200).json("view increased");
    } catch (err) {
        next(err);
    }
}

export const randoms=async(req,res,next)=>{
    try {
       const videos= await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos)
    } catch (err) {
        next(err);
    }
}

export const trend=async(req,res,next)=>{
    try {
        const tvideos= await Video.find().sort({views:-1}).limit(30)
         res.status(200).json(tvideos)
     } catch (err) {
         next(err);
     }
}

export const search=async(req,res,next)=>{
    const query=req.query.q; 
    
    try {
        const tvideos= await Video.find({title:{ $regex:query},}).limit(30)
         res.status(200).json(tvideos)
     } catch (err) {
         next(err);
     }
}

export const getbytag=async(req,res,next)=>{
    const tags=await req.query.tags.split(",");
    // console.log(tags)
    try {
        const tvideos= await Video.find({tags:{$in:tags}}).limit(5);
        // console.log(tvideos);
         res.status(200).json(tvideos)
     } catch (err) {
         next(err);
     }
}

export const sub=async(req,res,next)=>{
    try {
        const suser= await User.findById(req.user.id);
        const subscribedChannels=User.SubscribedUsers;

        const list= await Promise.all(
            subscribedChannels.map((channelId)=>{return Video.find({userId:channelId})
        })
        );
        // sorting js
         res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
     } catch (err) {
         next(err);
     }
}

export const like=async(req,res,next)=>{

    const id=req.body.id;
    const videoId=req.params.videoId;
    try {
       const likeone= await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("you liked the video")
    } catch (err) {
        next(err);
    }
}

export const dislike=async(req,res,next)=>{
    const id=req.body.id;
    const videoId=req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        
        res.status(200).json("you liked the video")
    } catch (err) {
        next(err);
    }
}