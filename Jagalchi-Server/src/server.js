import express  from "express";
import https from "https"
import http from "http"; 
import morgan from "morgan";
import "dotenv/config";
import "./db";
import "./models/User";
import fs from "fs";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import uploadRouter from "./routers/uploadRouter";
import postRouter from "./routers/postRouter";

const HTTP_PORT = 8000;
const HTTPS_PORT = 8080;

const app = express();
app.use(morgan("combined"));
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true,
        secure: true
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        next();
    })
});

// app.use(cors({ 
//     origin: ['http://bandallgom.com:3000'],
//     credentials: true,
// }));

//라우팅
//app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/upload", uploadRouter);
app.use("/post", postRouter);
app.use("/uploads", express.static("uploads"));

//Request Limit
app.use("/login", rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20
}));

//docker의 경우 가상 경로 사용
//app.get("*", (req, res) => res.sendFile(process.env.ASSET_PATH + "/index.html"));
app.get("*", (req, res) => res.sendFile("/home/node/app/Jagalchi-Server/assets/index.html"));

//인증서 자동 갱신되도록 시놀로지 NAS 내부 경로로 설정 필요
const https_options = {
    ca: fs.readFileSync(__dirname + "/../cert/chain.pem"),
    key: fs.readFileSync(__dirname + "/../cert/privkey.pem"),
    cert: fs.readFileSync(__dirname + "/../cert/cert.pem")
}

//http -> https redirect
http.createServer((req, res) => {
    res.writeHead(301, {Location: `https://${req.headers.host}${req.url}`});
    res.end();
}).listen(HTTP_PORT, "0.0.0.0");
https.createServer(https_options, app).listen(HTTPS_PORT , "0.0.0.0", () => console.log(`Server Listening on Port http://localhost:${HTTPS_PORT}`));
//app.listen(PORT , "0.0.0.0", () => console.log(`Server Listening on Port http://localhost:${PORT}`));