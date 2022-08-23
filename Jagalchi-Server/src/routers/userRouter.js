import express, { Router } from "express";
import { 
    logout, 
    getEdit, 
    postEdit, 
    getChangePassword, 
    postChangePassword,
    postUserInfo,
    getUser
 } from "../controllers/userControll";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares";
const userRouter = express.Router();

userRouter.route("/logout").all(loginOnlyMiddleWare).post(logout);
userRouter.route("/edit").all(loginOnlyMiddleWare).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(loginOnlyMiddleWare).get(getChangePassword).post(postChangePassword);
userRouter.route("/:userID([0-9a-f]{24})").get(getUser);
//userRouter.route("/info/:id").get();


export default userRouter;