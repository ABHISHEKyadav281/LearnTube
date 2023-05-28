import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {  
    userId: {
      type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
