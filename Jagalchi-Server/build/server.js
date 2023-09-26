"use strict";

var _express = _interopRequireDefault(require("express"));
var _https = _interopRequireDefault(require("https"));
var _http = _interopRequireDefault(require("http"));
var _morgan = _interopRequireDefault(require("morgan"));
require("dotenv/config");
require("./db");
require("./models/User");
var _fs = _interopRequireDefault(require("fs"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _cors = _interopRequireDefault(require("cors"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));
var _uploadRouter = _interopRequireDefault(require("./routers/uploadRouter"));
var _postRouter = _interopRequireDefault(require("./routers/postRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var HTTP_PORT = 8800;
var HTTPS_PORT = 8080;
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("combined"));
app.use((0, _helmet["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24,
    httpOnly: true,
    secure: true
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use(function (req, res, next) {
  req.sessionStore.all(function (error, sessions) {
    next();
  });
});

// app.use(cors({ 
//     origin: ['http://bandallgom.com:3000'],
//     credentials: true,
// }));

//라우팅
//app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
app.use("/upload", _uploadRouter["default"]);
app.use("/post", _postRouter["default"]);
app.use("/uploads", _express["default"]["static"]("uploads"));

//Request Limit
app.use("/login", (0, _expressRateLimit["default"])({
  windowMs: 10 * 60 * 1000,
  max: 20
}));

//docker의 경우 가상 경로 사용
//app.get("*", (req, res) => res.sendFile(process.env.ASSET_PATH + "/index.html"));
app.get("*", function (req, res) {
  return res.sendFile("/home/node/app/Jagalchi-Server/assets/index.html");
});

//인증서 자동 갱신되도록 시놀로지 NAS 내부 경로로 설정 필요
var https_options = {
  ca: _fs["default"].readFileSync(__dirname + "/../cert/chain.pem"),
  key: _fs["default"].readFileSync(__dirname + "/../cert/privkey.pem"),
  cert: _fs["default"].readFileSync(__dirname + "/../cert/cert.pem")
};

//http -> https redirect
_http["default"].createServer(function (req, res) {
  res.writeHead(301, {
    Location: "https://".concat(req.headers.host).concat(req.url)
  });
  res.end();
}).listen(HTTP_PORT, "0.0.0.0", function () {
  return console.log("Server Listening on Port http://localhost:".concat(HTTP_PORT));
});
_https["default"].createServer(https_options, app).listen(HTTPS_PORT, "0.0.0.0", function () {
  return console.log("Server Listening on Port http://localhost:".concat(HTTPS_PORT));
});
//app.listen(PORT , "0.0.0.0", () => console.log(`Server Listening on Port http://localhost:${PORT}`));