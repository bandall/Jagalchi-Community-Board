"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var commentSchema = new _mongoose["default"].Schema({
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  ownerName: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    "default": false
  },
  commentText: {
    type: String,
    required: true
  },
  post: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Comment"
  },
  parentComment: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment",
    "default": null
  },
  thumbsUp: {
    type: _mongoose["default"].Schema.Types.Number,
    "default": 0
  },
  thumbsUpUsers: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }],
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = exports["default"] = Comment;