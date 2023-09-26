"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _uploadController = require("../controllers/uploadController");
var _middlewares = require("../middlewares.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var uploadRouter = _express["default"].Router();
uploadRouter.route("/image").all(_middlewares.loginOnlyMiddleWare).post(_uploadController.uploadImage.fields([{
  name: "img",
  maxCount: 1
}]), _uploadController.postImage);
uploadRouter.route("/video").all(_middlewares.loginOnlyMiddleWare).post(_uploadController.uploadVideo.fields([{
  name: "video",
  maxCount: 1
}]), _uploadController.postVideo);
uploadRouter.route("/avatar").all(_middlewares.loginOnlyMiddleWare).post(_uploadController.uploadAvatar.fields([{
  name: "avatar",
  maxCount: 1
}]), _uploadController.postAvatar);
var _default = exports["default"] = uploadRouter;