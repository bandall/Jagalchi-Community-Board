import express from "express";
import { loginOnlyMiddleWare } from "../middlewares";
import { getUserInfo } from "../controllers/apiController";
import { deleteComment, deletePost, editPost, getComment, getPost, getSearch, recommandPost, submitComment } from "../controllers/postController";
import { sendAuthEmail } from "../controllers/mailController";
const apiRouter = express.Router();

apiRouter.route("/userinfo").get(getUserInfo);
apiRouter.route("/post/:postID([0-9a-f]{24})").get(getPost);
apiRouter.route("/post/recommand/:postID([0-9a-f]{24})").all(loginOnlyMiddleWare).post(recommandPost);
apiRouter.route("/post/delete/:postID([0-9a-f]{24})").all(loginOnlyMiddleWare).post(deletePost);
apiRouter.route("/post/search").get(getSearch);
apiRouter.route("/post/edit/:postID([0-9a-f]{24})").all(loginOnlyMiddleWare).post(editPost);
apiRouter.route("/post/comment/:postID([0-9a-f]{24})").get(getComment);
apiRouter.route("/post/comment/submit").all(loginOnlyMiddleWare).post(submitComment);
apiRouter.route("/post/comment/delete/:commentID([0-9a-f]{24})").all(loginOnlyMiddleWare).post(deleteComment);
apiRouter.route("/user/auth").get(sendAuthEmail);
export default apiRouter;