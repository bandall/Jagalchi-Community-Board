import express from "express";
import { getFindPassword, postFindPassword } from "../controllers/authController";
import { home, attendance } from "../controllers/defaultControll"
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControll";
import { loginOnlyMiddleWare, publicOnlyMiddleWare } from "../middlewares.js";
import requestIP from "request-ip";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleWare).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleWare).post(postLogin);
rootRouter.route("/findpassword").all(publicOnlyMiddleWare).get(getFindPassword).post(postFindPassword);
rootRouter.route("/ip").get((req, res) => {
    return res.send(`Your IP is ${requestIP.getClientIp(req)}`);
})
rootRouter.route("/attendance").all(loginOnlyMiddleWare).get(attendance);

export default rootRouter;