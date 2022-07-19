import express from "express";
import { getPost, submitPost } from "../controllers/postController";
import { loginOnlyMiddleWare } from "../middlewares";

const postRouter = express.Router();
postRouter.route("/").get(getPost);
postRouter.route("/writeboard").all(loginOnlyMiddleWare).post(submitPost);

export default postRouter;