import express from "express";
import { home, attendance } from "../controllers/defaultControll"
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControll";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares.js";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/test").all(loginOnlyMiddleWare).get((req, res)=> res.send("YES"));
rootRouter.route("/join").all(publicOnlyMiddleWare).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleWare).post(postLogin);
rootRouter.route("/attendance").all(loginOnlyMiddleWare).get(attendance);

export default rootRouter;