import express from "express";
import { getPost, getPostList, submitPost } from "../controllers/postController";
import { loginOnlyMiddleWare } from "../middlewares";

const postRouter = express.Router();
postRouter.route("/").get(getPostList);
postRouter.route("/writeboard").all(loginOnlyMiddleWare).post(submitPost);
//postRouter.route("/:postID([0-9a-f]{24})").get(getPost);


export default postRouter;