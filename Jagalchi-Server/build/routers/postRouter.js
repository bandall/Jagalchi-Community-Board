"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _postController = require("../controllers/postController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var postRouter = _express["default"].Router();
postRouter.route("/").get(_postController.getPostList);
postRouter.route("/writeboard").all(_middlewares.loginOnlyMiddleWare).post(_postController.submitPost);
//postRouter.route("/:postID([0-9a-f]{24})").get(getPost);
var _default = exports["default"] = postRouter;