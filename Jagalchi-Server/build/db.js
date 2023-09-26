"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(process.env.DB_URL, {
  // authSource: "admin",
  // user: "bandall",
  // pass: "sunf426617!",
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = _mongoose["default"].connection;
var handleOpen = function handleOpen() {
  return console.log("Connected to MongoDB");
};
var handleError = function handleError(err) {
  return console.log("DB Error", err);
};
db.on("error", handleError);
db.once("open", handleOpen);