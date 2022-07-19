import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    owner: { type:mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
    title: { type: String, required: true },
    views: { type:Number, default: 0, required:true },
    recommand: { type:Number, default: 0, required:true },
    comment: [{ type:mongoose.Schema.Types.ObjectId, required: true, ref:"Comment" }],
    textHTML: { type: String, required: true },
    attachedFile: [
        { type: String, required: true },
    ],
    createdAt: { type: Date, required: true, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
export default Post;