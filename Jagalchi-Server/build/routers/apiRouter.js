"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _apiController = require("../controllers/apiController");
var _postController = require("../controllers/postController");
var _mailController = require("../controllers/mailController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var apiRouter = _express["default"].Router();
apiRouter.route("/userinfo").get(_apiController.getUserInfo);
apiRouter.route("/post/:postID([0-9a-f]{24})").get(_postController.getPost);
apiRouter.route("/post/recommand/:postID([0-9a-f]{24})").all(_middlewares.loginOnlyMiddleWare).post(_postController.recommandPost);
apiRouter.route("/post/delete/:postID([0-9a-f]{24})").all(_middlewares.loginOnlyMiddleWare).post(_postController.deletePost);
apiRouter.route("/post/search").get(_postController.getSearch);
apiRouter.route("/post/edit/:postID([0-9a-f]{24})").all(_middlewares.loginOnlyMiddleWare).post(_postController.editPost);
apiRouter.route("/post/comment/:postID([0-9a-f]{24})").get(_postController.getComment);
apiRouter.route("/post/comment/submit").all(_middlewares.loginOnlyMiddleWare).post(_postController.submitComment);
apiRouter.route("/post/comment/delete/:commentID([0-9a-f]{24})").all(_middlewares.loginOnlyMiddleWare).post(_postController.deleteComment);
var _default = exports["default"] = apiRouter;