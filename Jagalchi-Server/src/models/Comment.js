import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    owner: { type:mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
    text: { type: String, required:true },
    post: { type:mongoose.Schema.Types.ObjectId, required: true, ref:"Comment" },
    parentComment: { type:mongoose.Schema.Types.ObjectId, ref:"Comment", default: null },
    thumbsUp: { type:mongoose.Schema.Types.Number, default: 0 },
    thumbsUpUsers: [ { type:mongoose.Schema.Types.ObjectId, required: true, ref:"User" } ],
    createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;