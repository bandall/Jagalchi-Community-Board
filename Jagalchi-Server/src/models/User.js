import mongoose from "mongoose";
import bycript from "bcrypt";

const userSchema = mongoose.Schema({
    username: { type:String, required:true, unique:true },
    email: { type:String, required:true, unique:true },
    birthDate: { type:Date },
    password: { type:String, required:true },
    loginDates: [{ type:Date }],
    points: { type:Number, default: 0 },
    avatarUrl: { type:String },
    posts: [
        { type:mongoose.Schema.Types.ObjectId, required: true, ref:"Post" }
    ],
    comments: [
        { type:mongoose.Schema.Types.ObjectId, required: true, ref:"Comment" }
    ],
});

userSchema.pre("save", async function() {
    if(this.isModified("password")) {
        this.password = await bycript.hash(this.password, 5);
    }
});

const User = mongoose.model("User", userSchema);
export default User;