import express from "express";
import { loginOnlyMiddleWare } from "../middlewares";
import { getUserInfo } from "../controllers/apiController";
const apiRouter = express.Router();

apiRouter.route("/userinfo").get(getUserInfo);

export default apiRouter;