import express from "express";
import { getPost, getPostList, submitPost } from "../controllers/postController";
import { loginOnlyMiddleWare } from "../middlewares";

const postRouter = express.Router();
postRouter.route("/").get(getPostList);
postRouter.route("/:postID").get(getPost);
postRouter.route("/writeboard").all(loginOnlyMiddleWare).post(submitPost);

export default postRouter;