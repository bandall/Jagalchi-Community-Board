"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitPost = exports.submitComment = exports.recommandPost = exports.getSearch = exports.getPostList = exports.getPost = exports.getComment = exports.editPost = exports.deletePost = exports.deleteComment = void 0;
var _Post = _interopRequireDefault(require("../models/Post"));
var _User = _interopRequireDefault(require("../models/User"));
var _Comment = _interopRequireDefault(require("../models/Comment"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//게시물 등록
var submitPost = exports.submitPost = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, title, text, fileList, _req$session$user, _id, username, retJSON, user, finalFiles, newPost, tmpFiles;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, text = _req$body.text, fileList = _req$body.fileList;
          _req$session$user = req.session.user, _id = _req$session$user._id, username = _req$session$user.username;
          retJSON = {
            status: false,
            postID: null,
            errMsg: ""
          };
          _context.prev = 3;
          if (!(title === "" || text === "")) {
            _context.next = 7;
            break;
          }
          retJSON.errMsg = "제목 또는 본문을 작성해주십시오.";
          return _context.abrupt("return", res.send(retJSON));
        case 7:
          _context.next = 9;
          return _User["default"].findById(_id);
        case 9:
          user = _context.sent;
          if (user) {
            _context.next = 13;
            break;
          }
          retJSON.errMsg = "존재하지 않는 유저입니다.";
          return _context.abrupt("return", res.send(retJSON));
        case 13:
          _context.next = 15;
          return deleteLeavedFiles(text, fileList);
        case 15:
          finalFiles = _context.sent;
          _context.next = 18;
          return _Post["default"].create({
            owner: _id,
            ownerName: username,
            title: title,
            textHTML: text,
            attachedFile: finalFiles,
            comment: []
          });
        case 18:
          newPost = _context.sent;
          /*
          findIndex 오류 수정, editPost도 확인요망
          */
          tmpFiles = user.tmpFiles;
          user.posts.unshift(newPost);
          //사용자 DB에 저장된 임시 파일들 삭제
          fileList.forEach(function (file) {
            var idx = tmpFiles.findIndex(function (path) {
              return path === file;
            });
            if (idx !== -1) {
              tmpFiles.splice(idx, 1);
            }
          });
          user.tmpFiles = tmpFiles;
          user.save();
          retJSON.status = true;
          retJSON.postID = String(newPost._id);
          return _context.abrupt("return", res.send(retJSON));
        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          retJSON.errMsg = "게시글 등록 중 오류가 발생했습니다.";
          return _context.abrupt("return", res.send(retJSON));
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 29]]);
  }));
  return function submitPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//게시글을 JSON으로 반환 (page: 현재 페이지, offset: 페이지당 개시물 수, key: 정렬기준)
var getPostList = exports.getPostList = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query, page, offset, key, postCount, maxPage, curPagePost, i, retJSON;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, page = _req$query.page, offset = _req$query.offset, key = _req$query.key;
          if (offset < 1 || offset > 20 || offset === null || offset === undefined) {
            offset = 10;
          }
          _context2.next = 4;
          return _Post["default"].countDocuments();
        case 4:
          postCount = _context2.sent;
          maxPage = Math.ceil(postCount / offset);
          if (page < 1 || page > maxPage || page === null || page === undefined) {
            page = 1;
          }
          if (!(key === "all")) {
            _context2.next = 13;
            break;
          }
          _context2.next = 10;
          return _Post["default"].find({}).sort({
            _id: -1
          }).skip((page - 1) * offset).limit(offset);
        case 10:
          curPagePost = _context2.sent;
          _context2.next = 20;
          break;
        case 13:
          if (!(key === "hot")) {
            _context2.next = 19;
            break;
          }
          _context2.next = 16;
          return _Post["default"].find({}).sort({
            views: -1,
            _id: -1
          }).skip((page - 1) * offset).limit(offset);
        case 16:
          curPagePost = _context2.sent;
          _context2.next = 20;
          break;
        case 19:
          return _context2.abrupt("return", res.redirect("/"));
        case 20:
          for (i = 0; i < curPagePost.length; i++) {
            curPagePost[i].__v = undefined;
            curPagePost[i].recommandUsers = undefined;
            curPagePost[i].comment = undefined;
            curPagePost[i].textHTML = undefined;
            curPagePost[i].attachedFile = undefined;
          }
          retJSON = {
            maxPage: maxPage,
            curPage: page,
            startNum: postCount - (page - 1) * offset,
            posts: curPagePost
          };
          return _context2.abrupt("return", res.send(retJSON));
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getPostList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//게시글 불러오기
var getPost = exports.getPost = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var postID, post, postData, retJSON, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          postID = req.params.postID;
          _context3.prev = 1;
          _context3.next = 4;
          return _Post["default"].findById(postID);
        case 4:
          post = _context3.sent;
          if (post) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 게시물입니다."
          }));
        case 7:
          if (!req.session.view_list) {
            req.session.view_list = [];
          }
          if (!req.session.view_list.includes(String(postID))) {
            req.session.view_list.push(String(postID));
            post.views = post.views + 1;
          }
          postData = {
            owner_id: post.owner,
            ownerName: post.ownerName,
            title: post.title,
            date: post.createdAt,
            textHTML: post.textHTML,
            comment: post.comments,
            view: post.views,
            recommand: post.recommand,
            attachedFile: post.attachedFile
          };
          retJSON = {
            modify: false,
            recommanded: false,
            postData: postData
          }; //게시글 수정 권한 및 추천 여부 확인
          if (req.session.loggedIn) {
            user = req.session.user;
            if (user._id == post.owner) retJSON.modify = true;
            post.recommandUsers.forEach(function (list) {
              if (list == user._id) {
                retJSON.recommanded = true;
              }
            });
          }
          _context3.next = 14;
          return post.save();
        case 14:
          return _context3.abrupt("return", res.send(retJSON));
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(404).send({
            errMsg: "게시글을 불러오지 못 했습니다."
          }));
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 17]]);
  }));
  return function getPost(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
//게시글 추천
var recommandPost = exports.recommandPost = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var postID, userID, post, i;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          postID = req.params.postID;
          userID = req.session.user._id;
          _context4.prev = 2;
          _context4.next = 5;
          return _Post["default"].findById(postID);
        case 5:
          post = _context4.sent;
          i = 0;
        case 7:
          if (!(i < post.recommand)) {
            _context4.next = 13;
            break;
          }
          if (!(String(post.recommandUsers[i]) === String(userID))) {
            _context4.next = 10;
            break;
          }
          throw new Error("이미 추천한 게시물입니다.");
        case 10:
          i++;
          _context4.next = 7;
          break;
        case 13:
          post.recommandUsers.unshift(userID);
          post.recommand = post.recommand + 1;
          _context4.next = 17;
          return post.save();
        case 17:
          return _context4.abrupt("return", res.sendStatus(200));
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](2);
          return _context4.abrupt("return", res.status(400).send({
            errMsg: _context4.t0.message
          }));
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 20]]);
  }));
  return function recommandPost(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
//게시글 삭제
var deletePost = exports.deletePost = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var postID, userID, post, user, i;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          postID = req.params.postID;
          userID = req.session.user._id;
          _context5.prev = 2;
          _context5.next = 5;
          return _Post["default"].findById(postID);
        case 5:
          post = _context5.sent;
          _context5.next = 8;
          return _User["default"].findById(userID);
        case 8:
          user = _context5.sent;
          if (post) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 게시물입니다."
          }));
        case 11:
          if (user) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 유저입니다."
          }));
        case 13:
          if (!(String(post.owner) !== String(userID))) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", res.status(404).send({
            errMsg: "파일 삭제 권한이 없습니다."
          }));
        case 15:
          i = 0;
        case 16:
          if (!(i < post.comments.length)) {
            _context5.next = 22;
            break;
          }
          _context5.next = 19;
          return _Comment["default"].findByIdAndDelete(String(post.comments[i]._id));
        case 19:
          i++;
          _context5.next = 16;
          break;
        case 22:
          post.attachedFile.forEach(function (file) {
            _fs["default"].unlink(file, function (err) {
              if (err) console.log(file + " 삭제 실패");
            });
          });
          _context5.next = 25;
          return user.save();
        case 25:
          _context5.next = 27;
          return _Post["default"].findByIdAndDelete(postID);
        case 27:
          return _context5.abrupt("return", res.sendStatus(200));
        case 30:
          _context5.prev = 30;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(400).send({
            errMsg: "파일 삭제 중 오류가 발생했습니다."
          }));
        case 34:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 30]]);
  }));
  return function deletePost(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//src에 존재하지 않는 파일을 삭제하고 최종 저장된 파일 목록 반환
var deleteLeavedFiles = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(HTMLText, fileList) {
    var srcRex, srcFiles, deletedFiles, finalFiles;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          srcRex = /src=[\"']?([^>\"']+)[\"']?[^>]*/g;
          srcFiles = HTMLText.match(srcRex) || [];
          deletedFiles = [];
          finalFiles = [];
          fileList.forEach(function (file) {
            var deleted = true;
            for (var i = 0; i < srcFiles.length; i++) {
              if (srcFiles[i].includes(file)) deleted = false;
            }
            if (deleted) deletedFiles.push(file);else finalFiles.push(file);
          });
          deletedFiles.forEach(function (file) {
            _fs["default"].unlink(file, function (err) {
              if (err) console.log(file + " 삭제 실패");
            });
          });
          return _context6.abrupt("return", finalFiles);
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function deleteLeavedFiles(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//html에 존재하는 파일과 attachedFile에 존재하는 파일을 비교
//수정중 삭제된 파일을 찾아 삭제
var editPost = exports.editPost = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, title, text, fileList, postID, _id, post, user, finalFiles, tmpFiles;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body2 = req.body, title = _req$body2.title, text = _req$body2.text, fileList = _req$body2.fileList, postID = _req$body2.postID;
          _id = req.session.user._id;
          _context7.prev = 2;
          _context7.next = 5;
          return _Post["default"].findById(postID);
        case 5:
          post = _context7.sent;
          _context7.next = 8;
          return _User["default"].findById(_id);
        case 8:
          user = _context7.sent;
          if (post) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(404).send({
            errMsg: "게시글이 존재하지 않습니다."
          }));
        case 11:
          if (!(String(_id) !== String(post.owner))) {
            _context7.next = 13;
            break;
          }
          return _context7.abrupt("return", res.status(403).send({
            errMsg: "게시글 수젇 권한이 없습니다."
          }));
        case 13:
          _context7.next = 15;
          return deleteLeavedFiles(text, fileList);
        case 15:
          finalFiles = _context7.sent;
          tmpFiles = user.tmpFiles;
          fileList.forEach(function (file) {
            var idx = tmpFiles.findIndex(function (path) {
              return path === file;
            });
            if (idx !== -1) {
              tmpFiles.splice(idx, 1);
            }
          });
          post.title = title;
          post.textHTML = text;
          post.attachedFile = finalFiles;
          user.tmpFiles = tmpFiles;
          _context7.next = 24;
          return post.save();
        case 24:
          _context7.next = 26;
          return user.save();
        case 26:
          return _context7.abrupt("return", res.sendStatus(200));
        case 29:
          _context7.prev = 29;
          _context7.t0 = _context7["catch"](2);
          return _context7.abrupt("return", res.status(400).send({
            errMsg: "예기치 못한 오류가 발생했습니다."
          }));
        case 32:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 29]]);
  }));
  return function editPost(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//제목 + 본문으로 게시글 검색
var getSearch = exports.getSearch = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$query2, page, offset, keyword, searchPosts, postCount, maxPage, slicedPosts, i, retJSON;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$query2 = req.query, page = _req$query2.page, offset = _req$query2.offset, keyword = _req$query2.keyword;
          if (offset < 1 || offset > 20 || offset === null || offset === undefined) {
            offset = 10;
          }
          _context8.prev = 2;
          _context8.next = 5;
          return _Post["default"].find({
            $or: [{
              title: {
                $regex: new RegExp("".concat(keyword), "i")
              }
            }, {
              textHTML: {
                $regex: new RegExp("".concat(keyword), "i")
              }
            }]
          }).sort({
            _id: -1
          });
        case 5:
          searchPosts = _context8.sent;
          postCount = searchPosts.length;
          maxPage = Math.ceil(postCount / offset);
          if (page < 1 || page > maxPage || page === null || page === undefined) {
            page = 1;
          }
          slicedPosts = searchPosts.slice((page - 1) * offset, (page - 1) * offset + offset);
          for (i = 0; i < slicedPosts.length; i++) {
            slicedPosts[i].owner = undefined;
            slicedPosts[i].__v = undefined;
            slicedPosts[i].recommandUsers = undefined;
            slicedPosts[i].textHTML = undefined;
            slicedPosts[i].attachedFile = undefined;
          }
          retJSON = {
            posts: slicedPosts,
            maxPage: maxPage,
            curPage: page,
            startNum: postCount - (page - 1) * offset
          };
          return _context8.abrupt("return", res.send(retJSON));
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](2);
          return _context8.abrupt("return", res.status(400).send({
            errMsg: "예기치 못한 오류가 발생했습니다."
          }));
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 15]]);
  }));
  return function getSearch(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

//댓글 등록
//부모 댓글이 있을 경우 배열 중간을 찾아 삽입, 없을 경우 배열 맨 끝에 삽입
var submitComment = exports.submitComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body3, postID, commentText, parentComment, _req$session$user2, _id, username, retJSON, user, post, newComment, parent, idx, cnt, i;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$body3 = req.body, postID = _req$body3.postID, commentText = _req$body3.commentText, parentComment = _req$body3.parentComment;
          _req$session$user2 = req.session.user, _id = _req$session$user2._id, username = _req$session$user2.username;
          retJSON = {
            username: username,
            _id: ""
          };
          if (!(commentText === "")) {
            _context9.next = 5;
            break;
          }
          return _context9.abrupt("return", res.status(400).send({
            errMsg: "댓글을 작성해주세요."
          }));
        case 5:
          _context9.prev = 5;
          _context9.next = 8;
          return _User["default"].findById(_id);
        case 8:
          user = _context9.sent;
          _context9.next = 11;
          return _Post["default"].findById(postID).populate("comments");
        case 11:
          post = _context9.sent;
          if (!(!user || !post)) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", res.status(400).send({
            errMsg: "잘못된 접근입니다."
          }));
        case 14:
          if (parentComment) {
            _context9.next = 21;
            break;
          }
          _context9.next = 17;
          return _Comment["default"].create({
            owner: _id,
            ownerName: username,
            commentText: commentText,
            post: postID,
            parentComment: null,
            isDeleted: false
          });
        case 17:
          newComment = _context9.sent;
          post.comments.push(newComment);
          _context9.next = 40;
          break;
        case 21:
          _context9.next = 23;
          return _Comment["default"].findById(parentComment);
        case 23:
          parent = _context9.sent;
          if (!(!parentComment || parent.parentComment)) {
            _context9.next = 26;
            break;
          }
          return _context9.abrupt("return", res.sendStatus(400));
        case 26:
          _context9.next = 28;
          return _Comment["default"].create({
            owner: _id,
            ownerName: username,
            commentText: commentText,
            post: postID,
            parentComment: parentComment,
            isDeleted: false
          });
        case 28:
          newComment = _context9.sent;
          idx = post.comments.findIndex(function (comment) {
            if (String(comment._id) === String(parentComment)) return true;else return false;
          }); //nested comment 마지막 idx 찾아서 배열에 삽입까지 구현하기 오류체크
          cnt = 0;
          i = idx + 1;
        case 32:
          if (!(i < post.comments.length)) {
            _context9.next = 39;
            break;
          }
          if (!(String(post.comments[i].parentComment) !== String(parentComment))) {
            _context9.next = 35;
            break;
          }
          return _context9.abrupt("break", 39);
        case 35:
          cnt = cnt + 1;
        case 36:
          i++;
          _context9.next = 32;
          break;
        case 39:
          post.comments.splice(idx + cnt + 1, 0, newComment);
        case 40:
          user.comments.unshift(newComment);
          _context9.next = 43;
          return user.save();
        case 43:
          _context9.next = 45;
          return post.save();
        case 45:
          retJSON._id = String(newComment._id);
          return _context9.abrupt("return", res.send(retJSON));
        case 49:
          _context9.prev = 49;
          _context9.t0 = _context9["catch"](5);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(400).send({
            errMsg: "예기치 못한 오류가 발생했습니다."
          }));
        case 53:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[5, 49]]);
  }));
  return function submitComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

//댓글 불러오기
var getComment = exports.getComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var postID, post;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          postID = req.params.postID; // const dummyComment = {
          //     owner: null,
          //     ownerName: "",
          //     commentText: "삭제된 댓글입니다.",
          // }
          _context10.prev = 1;
          _context10.next = 4;
          return _Post["default"].findById(postID).populate("comments");
        case 4:
          post = _context10.sent;
          if (post) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.Status(404).send({
            errMsg: "댓글이 존재하지 않습니다."
          }));
        case 7:
          post.comments.forEach(function (comment) {
            if (comment.isDeleted) {
              comment.commentText = "삭제된 게시글입니다.";
            }
          });
          //Nested Comment에 부모 댓글이 없으면 더미 데이터 추가
          // const comments = [];
          // const parentList = [];
          // for(let i = 0; i < post.comments.length; i++) {
          //     if(post.comments[i].parentComment === null) {
          //         parentList.push(String(post.comments[i]._id));
          //     }
          //     else {
          //         if(parentList.findIndex((parentID) => parentID === String(post.comments[i].parentComment))) {
          //             comments.push()
          //         }
          //     }
          //     comments.push(post.comments[i]);
          // }
          res.send(post.comments);
          _context10.next = 15;
          break;
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](1);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.Status(400).send({
            errMsg: "예기치 못한 오류가 발생했습니다."
          }));
        case 15:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 11]]);
  }));
  return function getComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

//댓글 삭제
//댓글은 게시글이 삭제될때 DB에서 한꺼번에 제거됨, 일단 isDeleted만 true로 설정
var deleteComment = exports.deleteComment = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var commentID, _id, comment;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          commentID = req.params.commentID;
          _id = req.session.user._id;
          _context11.prev = 2;
          _context11.next = 5;
          return _Comment["default"].findById(commentID);
        case 5:
          comment = _context11.sent;
          if (comment) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return", res.status(404).send({
            errMsg: "존재하지 않는 댓글입니다."
          }));
        case 8:
          if (!(String(comment.owner) !== String(_id))) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", res.status(403).send({
            errMsg: "댓글 삭제 권한이 없습니다."
          }));
        case 10:
          comment.isDeleted = true;
          _context11.next = 13;
          return comment.save();
        case 13:
          return _context11.abrupt("return", res.sendStatus(200));
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](2);
          console.log(_context11.t0);
          return _context11.abrupt("return", res.status(400).send({
            errMsg: "예기치 못한 오류가 발생했습니다."
          }));
        case 20:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[2, 16]]);
  }));
  return function deleteComment(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();