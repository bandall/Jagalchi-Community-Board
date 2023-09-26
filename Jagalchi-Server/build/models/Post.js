"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var postSchema = _mongoose["default"].Schema({
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  ownerName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    "default": 0,
    required: true
  },
  recommand: {
    type: Number,
    "default": 0,
    required: true
  },
  recommandUsers: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Comment"
  }],
  textHTML: {
    type: String,
    required: true
  },
  attachedFile: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
var Post = _mongoose["default"].model("Post", postSchema);
var _default = exports["default"] = Post;