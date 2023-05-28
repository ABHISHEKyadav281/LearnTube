import user from "../models/Users.js"
// import Video from "../models/Videos.js";

export const test=()=>{
    console.log("test")
}



export const update=async (req,res,next)=>{ 
    if(req.params.id===req.user.id){
        try {
            const updateUser=await user.findOneAndUpdate(req.params.id,{ set:req.body},{new:true});
            res.status(200).json(updateUser);
            
        } catch (err) {
            next(err);
        }
    }
}

export const deleteUser=async (req,res,next)=>{
    
        try {
            const deleteUser= await user.findOneAndDelete({id:req.params.id});
            res.status(200).json("user deleted");
            
        } catch (err) {
            next(err);
        }
    
  
}

export const getFollowing=async(req,res,next)=>{
    console.log(req.params.id);
    try {
        const following= await user.findById(req.params.id).populate("subscribedUsers");
       
        res.status(200).json(following);
        console.log(following)
        
    } catch (err) {
        next(err);
    }
}


export const getUser=async(req,res,next)=>{
    try {
        const User= await user.findById(req.params.id).populate("videoId");
        // console.log(User)
        res.status(200).json(User);
        
    } catch (err) {
        next(err);
    }
}

export const subscribe=async(req,res,next)=>{
   let re=req.body.suser;
   if(re)
       { try {
            console.log("first")
            const ans1= await user.findByIdAndUpdate(req.body.suser,{$push:{subscribedUsers:req.params.id}},{new:true});
            const ans2= await user.findByIdAndUpdate(req.params.id,{$inc:{subscribers:+1}},{new:true});
          const q=  await ans1.save()
            await ans2.save()
            if(ans1 && ans2)
             res.status(200).json(q)   
        } catch (err) {
            next(err);
        }}
    
}

export const unsubscribe=async(req,res,next)=>{
    try {
       const usu= await user.findByIdAndUpdate(req.body.suser,{pull:{subscribedUsers:req.params.id}},{new:true});
       const usu1=  await user.findByIdAndUpdate(req.params.id,{$inc:{subscribers:-1}},{new:true});
       await usu.save();
       await usu1.save();
        res.status(200).json("Unsubscribed succesfull")   
   } catch (err) {
      next(err);
   }
}

// export const like=async(req,res,next)=>{

//     const id=req.user._id;
//     const videoId=req.params.videoId;
//     try {
//        const likeone= await video.findByIdAndUpdate(videoId,{
//             $addToSet:{likes:id},
//             $pull:{dislikes:id}
//         })
//         res.status(200).json("you liked the video")
//     } catch (err) {
//         next(err);
//     }
// }

// export const dislike=async(req,res,next)=>{
//     const id=req.user._id;
//     const videoId=req.params.videoId;
//     try {
//         await video.findByIdAndUpdate(videoId,{
//             $addToSet:{dislikes:id},
//             $pull:{likes:id}
//         })
        
//         res.status(200).json("you liked the video")
//     } catch (err) {
//         next(err);
//     }
// }

