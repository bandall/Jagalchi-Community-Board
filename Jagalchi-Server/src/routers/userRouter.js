import express, { Router } from "express";
import { getSecondAuth, postSecondAuth } from "../controllers/authController";
import { 
    logout, 
    getEditUser, 
    postEditUser, 
    getChangePassword, 
    postChangePassword,
    postUserInfo,
    getUser,
    getAvatar
 } from "../controllers/userControll";
import { authProcessOnlyMiddleWare, loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares";
const userRouter = express.Router();

userRouter.route("/logout").all(loginOnlyMiddleWare).post(logout);
userRouter.route("/edit").all(loginOnlyMiddleWare).get(getEditUser).post(postEditUser);
userRouter.route("/change-password").all(loginOnlyMiddleWare).get(getChangePassword).post(postChangePassword);
userRouter.route("/secondauth").all(authProcessOnlyMiddleWare).get(getSecondAuth).post(postSecondAuth);
userRouter.route("/:userID([0-9a-f]{24})").get(getUser);
userRouter.route("/avatar/:userID([0-9a-f]{24})").get(getAvatar);
userRouter.route("/edit").all(loginOnlyMiddleWare).get(getEditUser).post(postEditUser);


export default userRouter;