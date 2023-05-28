
import Comment from '../models/Comments.js';
import Video from '../models/Videos.js';

export const test2 = () => {
    console.log("test2")
}
export const addComment = async (req, res, next) => {
    const id = req.body.id;
    const newcomment =await Comment.create({ ...req.body, userId: id, videoId: req.params.idd });
    try {
        const saveComment = await newcomment.save();
        newcomment.commentId.push(saveComment);
        await newcomment.save();
// console.log(newcomment);
        res.status(200).json(saveComment);
    } catch (err) {
        next(err);
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId:req.params.videoId}).populate("userId");
        // console.log(comments,"hehe")
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const dcomment = await Comment.findById(req.params.id);
        const video = await video.findById(req.params.id);
        if (req.user.id === dcomment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("comment deleted");
        }
        else {
            res.json("only owner can delete");
        }
    } catch (err) {
        next(err);
    }
}
