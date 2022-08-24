import express from "express";
import { postAvatar, postImage, postVideo, uploadAvatar, uploadImage, uploadVideo } from "../controllers/uploadController";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares.js";
const uploadRouter = express.Router();

uploadRouter.route("/image").all(loginOnlyMiddleWare).post(uploadImage.fields([
    { name: "img", maxCount: 1 },
]), postImage);

uploadRouter.route("/video").all(loginOnlyMiddleWare).post(uploadVideo.fields([
    { name: "video", maxCount: 1 },
]), postVideo);

uploadRouter.route("/avatar").all(loginOnlyMiddleWare).post(uploadAvatar.fields([
    { name: "avatar", maxCount: 1 },
]), postAvatar);

export default uploadRouter;