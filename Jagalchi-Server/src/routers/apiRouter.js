import express from "express";
import { loginOnlyMiddleWare } from "../middlewares";
import { getUserInfo } from "../controllers/apiController";
import { deletePost, getPost, getSearch, recommandPost } from "../controllers/postController";
const apiRouter = express.Router();

apiRouter.route("/userinfo").get(getUserInfo);
apiRouter.route("/post/:postID([0-9a-f]{24})").get(getPost);
apiRouter.route("/post/recommand/:postID([0-9a-f]{24})").all(loginOnlyMiddleWare).post(recommandPost);
apiRouter.route("/post/delete/:postID([0-9a-f]{24})").all(loginOnlyMiddleWare).post(deletePost);
apiRouter.route("/post/search").get(getSearch);
export default apiRouter;