import express, { Router } from "express";
import { 
    logout, 
    getEdit, 
    postEdit, 
    getChangePassword, 
    postChangePassword,
    userInfo
 } from "../controllers/userControll";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.route("/change-password").get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", userInfo);

export default userRouter;