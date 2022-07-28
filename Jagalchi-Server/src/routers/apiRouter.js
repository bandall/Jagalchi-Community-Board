import express from "express";
import { loginOnlyMiddleWare } from "../middlewares";
import { getUserInfo } from "../controllers/apiController";
import { getPost } from "../controllers/postController";
import { postRecommand } from "../../../jagalchi-front/src/components/functions/postAPI";
const apiRouter = express.Router();

apiRouter.route("/userinfo").get(getUserInfo);
apiRouter.route("/post/:postID([0-9a-f]{24})").get(getPost);
apiRouter.route("post/:postID([0-9a-f]{24})/recommand").all(loginOnlyMiddleWare).post(postRecommand);
export default apiRouter;