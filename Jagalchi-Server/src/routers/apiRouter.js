import express from "express";
import { loginOnlyMiddleWare } from "../middlewares";
import { getUserInfo } from "../controllers/apiController";
import { getPost } from "../controllers/postController";
const apiRouter = express.Router();

apiRouter.route("/userinfo").get(getUserInfo);
apiRouter.route("/post/:postID([0-9a-f]{24})").get(getPost);
export default apiRouter;