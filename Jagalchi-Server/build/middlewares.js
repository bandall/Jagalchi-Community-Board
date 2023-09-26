"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicOnlyMiddleWare = exports.loginOnlyMiddleWare = exports.authProcessOnlyMiddleWare = void 0;
var loginOnlyMiddleWare = exports.loginOnlyMiddleWare = function loginOnlyMiddleWare(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};
var publicOnlyMiddleWare = exports.publicOnlyMiddleWare = function publicOnlyMiddleWare(req, res, next) {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};
var authProcessOnlyMiddleWare = exports.authProcessOnlyMiddleWare = function authProcessOnlyMiddleWare(req, res, next) {
  console.log("auth" + " " + String(req.session));
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  if (req.session.user) {
    return next();
  } else {
    return res.redirect("/");
  }
};