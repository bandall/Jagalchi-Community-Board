"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = void 0;
var getUserInfo = exports.getUserInfo = function getUserInfo(req, res) {
  var retJSON;
  if (!req.session.loggedIn) {
    retJSON = {
      loggedIn: false
    };
  } else {
    var user = req.session.user;
    retJSON = {
      loggedIn: true,
      username: user.username,
      userID: user._id
    };
  }
  return res.send(retJSON);
};