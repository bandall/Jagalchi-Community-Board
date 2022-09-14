import express  from "express";
import morgan from "morgan";
import "dotenv/config";
import "./db";
import "./models/User";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import uploadRouter from "./routers/uploadRouter";
import postRouter from "./routers/postRouter";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        next();
    })
});

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Cross-Origin-Opener-Policy","same-origin");
//     res.header("Cross-Origin-Embedder-Policy", "require-corp");
//     next();
// });

app.use(cors({ 
    origin: ['http://localhost:3000'],
    credentials: true,
}));

//라우팅
//app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/upload", uploadRouter);
app.use("/post", postRouter);
app.use("/uploads", express.static("uploads"));

app.get("*", (req, res) => res.sendFile(process.env.ASSET_PATH + "/index.html"));
app.listen(PORT , "0.0.0.0", () => console.log(`Server Listening on Port http://localhost:${PORT}`));