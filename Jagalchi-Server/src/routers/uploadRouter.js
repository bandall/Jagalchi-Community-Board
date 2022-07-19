import express from "express";
import { postImage, postVideo, uploadImage, uploadVideo } from "../controllers/uploadController";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares.js";
const uploadRouter = express.Router();

uploadRouter.route("/image").all(loginOnlyMiddleWare).post(uploadImage.fields([
    { name: "img", maxCount: 1 },
]), postImage);

uploadRouter.route("/video").all(loginOnlyMiddleWare).post(uploadVideo.fields([
    { name: "video", maxCount: 1 },
]), postVideo);

export default uploadRouter;