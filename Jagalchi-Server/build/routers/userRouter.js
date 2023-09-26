"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireWildcard(require("express"));
var _authController = require("../controllers/authController");
var _userControll = require("../controllers/userControll");
var _middlewares = require("../middlewares");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var userRouter = _express["default"].Router();
userRouter.route("/logout").all(_middlewares.loginOnlyMiddleWare).post(_userControll.logout);
userRouter.route("/edit").all(_middlewares.loginOnlyMiddleWare).get(_userControll.getEditUser).post(_userControll.postEditUser);
userRouter.route("/change-password").all(_middlewares.loginOnlyMiddleWare).get(_userControll.getChangePassword).post(_userControll.postChangePassword);
userRouter.route("/secondauth").all(_middlewares.authProcessOnlyMiddleWare).get(_authController.getSecondAuth).post(_authController.postSecondAuth);
userRouter.route("/:userID([0-9a-f]{24})").get(_userControll.getUser);
userRouter.route("/avatar/:userID([0-9a-f]{24})").get(_userControll.getAvatar);
userRouter.route("/edit").all(_middlewares.loginOnlyMiddleWare).get(_userControll.getEditUser).post(_userControll.postEditUser);
var _default = exports["default"] = userRouter;