"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = exports.attendance = void 0;
var home = exports.home = function home(req, res) {
  res.sendFile("/home/node/app/Jagalchi-Server/assets/index.html");
};
var attendance = exports.attendance = function attendance(req, res) {
  res.send("attendance");
};