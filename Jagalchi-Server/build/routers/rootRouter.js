"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/authController");
var _defaultControll = require("../controllers/defaultControll");
var _userControll = require("../controllers/userControll");
var _middlewares = require("../middlewares.js");
var _requestIp = _interopRequireDefault(require("request-ip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootRouter = _express["default"].Router();
rootRouter.get("/", _defaultControll.home);
rootRouter.route("/join").all(_middlewares.publicOnlyMiddleWare).post(_userControll.postJoin);
rootRouter.route("/login").all(_middlewares.publicOnlyMiddleWare).post(_userControll.postLogin);
rootRouter.route("/findpassword").all(_middlewares.publicOnlyMiddleWare).get(_authController.getFindPassword).post(_authController.postFindPassword);
rootRouter.route("/ip").get(function (req, res) {
  return res.send("Your IP is ".concat(_requestIp["default"].getClientIp(req)));
});
rootRouter.route("/attendance").all(_middlewares.loginOnlyMiddleWare).get(_defaultControll.attendance);
var _default = exports["default"] = rootRouter;