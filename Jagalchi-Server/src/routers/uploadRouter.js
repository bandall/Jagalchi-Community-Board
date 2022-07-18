import express from "express";
import { postImage, uploadImage } from "../controllers/uploadController";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares.js";
const uploadRouter = express.Router();

uploadRouter.route("/image").all(loginOnlyMiddleWare).post(uploadImage.fields([
    { name: "img", maxCount : 1 },
]), postImage);

export default uploadRouter;