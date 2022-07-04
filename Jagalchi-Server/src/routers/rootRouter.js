import express from "express";
import { home, attendance } from "../controllers/defaultControll"
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControll";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/test", (req, res) => {
    console.log(req.body);
    res.send("Good");
})
rootRouter.route("/join").post(postJoin);
rootRouter.route("/login").post(postLogin);
rootRouter.get("/attendance", attendance);

export default rootRouter;