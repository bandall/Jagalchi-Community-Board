"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSecondAuth = exports.postFindPassword = exports.getSecondAuth = exports.getFindPassword = void 0;
var _mailController = require("./mailController");
var _User = _interopRequireDefault(require("../models/User"));
var _crypto = _interopRequireDefault(require("crypto"));
var _requestIp = _interopRequireDefault(require("request-ip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getFindPassword = exports.getFindPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var email, user, authString, html, status;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.query.email;
          _context.prev = 1;
          _context.next = 4;
          return _User["default"].findOne({
            email: email
          });
        case 4:
          user = _context.sent;
          if (user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 이메일입니다."
          }));
        case 7:
          authString = _crypto["default"].randomBytes(4).toString("hex").toUpperCase();
          user.authString = authString;
          html = "\n            <div>\n                <div style=\"display: flex;\">\n                    <img src=\"http://localhost:4000/static/favicon.ico\" style=\"width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;\">\n                    <h1 style=\"color: #585858;\">[\uC790\uAC08\uCE58 \uC2DC\uC7A5]</h1>\n                </div>\n                <div>\n                    <h2>\uC548\uB155\uD558\uC138\uC694 <span style=\"color: green;\">".concat(user.username, "</span>\uB2D8.</h2>\n                    <h2><span style=\"color: green;\">").concat(user.username, "</span>\uB2D8\uC758 \uC778\uC99D \uCF54\uB4DC\uB294 <span style=\"color: blue;\">").concat(authString, "</span>\uC785\uB2C8\uB2E4.</h2>\n                </div>\n            </div>\n        ");
          _context.next = 12;
          return (0, _mailController.sendEmail)(email, "[자갈치 시장] 비밀번호 변경 인증 코드", "", html);
        case 12:
          status = _context.sent;
          if (status) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(404).send({
            errMsg: "이메일 전송에 실패했습니다."
          }));
        case 15:
          _context.next = 17;
          return user.save();
        case 17:
          return _context.abrupt("return", res.sendStatus(200));
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            errMsg: "예상치 못한 오류가 발생했습니다."
          }));
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 20]]);
  }));
  return function getFindPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var postFindPassword = exports.postFindPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, email, authString, user, tmpPassword, html, status;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, authString = _req$body.authString;
          _context2.prev = 1;
          _context2.next = 4;
          return _User["default"].findOne({
            email: email
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 이메일입니다."
          }));
        case 7:
          if (!(user.authString !== authString)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(403).send({
            errMsg: "인증번호 인증에 실패했습니다."
          }));
        case 9:
          user.authString = "";
          tmpPassword = _crypto["default"].randomBytes(4).toString("hex").toUpperCase();
          user.password = tmpPassword;
          html = "\n            <div>\n                <div style=\"display: flex;\">\n                    <img src=\"http://localhost:4000/static/favicon.ico\" style=\"width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;\">\n                    <h1 style=\"color: #585858;\">[\uC790\uAC08\uCE58 \uC2DC\uC7A5]</h1>\n                </div>\n                <div>\n                    <h2>\uC548\uB155\uD558\uC138\uC694 <span style=\"color: green;\">".concat(user.username, "</span>\uB2D8.</h2>\n                    <h2><span style=\"color: green;\">").concat(user.username, "</span>\uB2D8\uC758 \uC784\uC2DC\uBE44\uBC00\uBC88\uD638\uB294 <span style=\"color: blue;\">").concat(tmpPassword, "</span>\uC785\uB2C8\uB2E4.</h2>\n                    <h2>\uC784\uC2DC\uBE44\uBC00\uBC88\uD638\uB85C \uB85C\uADF8\uC778 \uD6C4 \uBE44\uBC00\uBC88\uD638\uB97C \uBCC0\uACBD\uD574\uC8FC\uC138\uC694.</h2>\n                </div>\n            </div>\n        ");
          _context2.next = 15;
          return (0, _mailController.sendEmail)(email, "[자갈치 시장] 임시 비밀번호 발급", "", html);
        case 15:
          status = _context2.sent;
          if (status) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", res.status(404).send({
            errMsg: "이메일 전송에 실패했습니다."
          }));
        case 18:
          _context2.next = 20;
          return user.save();
        case 20:
          return _context2.abrupt("return", res.sendStatus(200));
        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(400).send({
            errMsg: "예상치 못한 오류가 발생했습니다."
          }));
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 23]]);
  }));
  return function postFindPassword(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getSecondAuth = exports.getSecondAuth = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var email, user, authCode, html, status;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (req.session.user) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(404).send({
            errMsg: "잘못된 접근입니다."
          }));
        case 3:
          email = req.session.user.email;
          _context3.next = 6;
          return _User["default"].findOne({
            email: email
          });
        case 6:
          user = _context3.sent;
          if (user) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 이메일입니다."
          }));
        case 9:
          authCode = _crypto["default"].randomBytes(4).toString("hex").toUpperCase();
          user.authString = authCode;
          html = "\n            <div>\n                <div style=\"display: flex;\">\n                    <img src=\"http://localhost:4000/static/favicon.ico\" style=\"width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;\">\n                    <h1 style=\"color: #585858;\">[\uC790\uAC08\uCE58 \uC2DC\uC7A5]</h1>\n                </div>\n                <div>\n                    <h2>\uC548\uB155\uD558\uC138\uC694 <span style=\"color: green;\">".concat(user.username, "</span>\uB2D8.</h2>\n                    <h2><span style=\"color: green;\">").concat(user.username, "</span>\uB2D8\uC758 2\uCC28 \uC778\uC99D \uCF54\uB4DC\uB294 <span style=\"color: blue;\">").concat(authCode, "</span>\uC785\uB2C8\uB2E4.</h2>\n                </div>\n            </div>\n        ");
          _context3.next = 14;
          return (0, _mailController.sendEmail)(email, "[자갈치 시장] 2차 인증 코드", "", html);
        case 14:
          status = _context3.sent;
          if (status) {
            _context3.next = 17;
            break;
          }
          return _context3.abrupt("return", res.status(404).send({
            errMsg: "이메일 전송에 실패했습니다."
          }));
        case 17:
          _context3.next = 19;
          return user.save();
        case 19:
          return _context3.abrupt("return", res.sendStatus(200));
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(400).send({
            errMsg: "예상치 못한 오류가 발생했습니다."
          }));
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function getSecondAuth(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var postSecondAuth = exports.postSecondAuth = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var authCode, email, user, retJSON;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          authCode = req.body.authCode;
          _context4.prev = 1;
          if (req.session.user) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(404).send({
            errMsg: "잘못된 접근입니다."
          }));
        case 4:
          email = req.session.user.email;
          _context4.next = 7;
          return _User["default"].findOne({
            email: email
          });
        case 7:
          user = _context4.sent;
          if (user) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 이메일입니다."
          }));
        case 10:
          if (!(user.authString !== authCode)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(403).send({
            errMsg: "인증번호 인증에 실패했습니다."
          }));
        case 12:
          user.authString = "";
          user.isAuthed = true;
          if (!user.authedIPs.includes(String(_requestIp["default"].getClientIp(req)))) {
            user.authedIPs.push(String(_requestIp["default"].getClientIp(req)));
          }
          req.session.loggedIn = true;
          retJSON = {
            username: user.username,
            userID: user._id,
            point: user.points
          };
          _context4.next = 19;
          return user.save();
        case 19:
          return _context4.abrupt("return", res.send(retJSON));
        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(400).send({
            errMsg: "예상치 못한 오류가 발생했습니다."
          }));
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 22]]);
  }));
  return function postSecondAuth(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();