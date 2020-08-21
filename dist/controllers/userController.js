"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _helpers = _interopRequireDefault(require("../middlewares/helpers"));

var _token = _interopRequireDefault(require("../middlewares/token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User = _db["default"].User;

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "fetchAllUser",
    value: function () {
      var _fetchAllUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.findAll({});

              case 3:
                user = _context.sent;
                res.status(200).json({
                  status: 'success',
                  data: user,
                  message: 'Fetched successfully'
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  status: 'error',
                  message: _context.t0.message
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function fetchAllUser(_x, _x2) {
        return _fetchAllUser.apply(this, arguments);
      }

      return fetchAllUser;
    }()
  }, {
    key: "fetchSingleUser",
    value: function () {
      var _fetchSingleUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var id, existUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = req.params.id;
                _context2.next = 4;
                return _helpers["default"].existUserById(id);

              case 4:
                existUser = _context2.sent;

                if (existUser) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'User does not exist'
                }));

              case 7:
                res.status(200).json({
                  status: 'success',
                  data: existUser,
                  message: 'Fetched successfully'
                });
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                res.status(500).json({
                  status: 'error',
                  message: _context2.t0.message
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function fetchSingleUser(_x3, _x4) {
        return _fetchSingleUser.apply(this, arguments);
      }

      return fetchSingleUser;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, _req$body, fname, lname, phone, existUser, _updateUser2, token;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _req$body = req.body, fname = _req$body.fname, lname = _req$body.lname, phone = _req$body.phone;

                if (name) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'Field is not allowed to be empty'
                }));

              case 5:
                _context3.next = 7;
                return _helpers["default"].existUserById(id);

              case 7:
                existUser = _context3.sent;

                if (!existUser) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 11;
                return User.update({
                  fname: fname,
                  lname: lname,
                  phone: phone
                }, {
                  returning: true,
                  where: {
                    id: id
                  }
                });

              case 11:
                _updateUser2 = _context3.sent;
                _context3.next = 14;
                return _token["default"].generateToken(_updateUser2);

              case 14:
                token = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Name changed successfully',
                  data: _updateUser2[1][0],
                  token: "Bearer ".concat(token)
                }));

              case 16:
                return _context3.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'User does not exist'
                }));

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  status: 'error',
                  message: _context3.t0.message
                });

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }));

      function updateUser(_x5, _x6) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, existUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                _context4.next = 4;
                return _helpers["default"].existUserById(id);

              case 4:
                existUser = _context4.sent;

                if (existUser) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'User does not exist'
                }));

              case 7:
                _context4.next = 9;
                return User.destroy({
                  where: {
                    id: id
                  }
                });

              case 9:
                res.status(200).json({
                  status: 'success',
                  message: 'Deleted successfully'
                });
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                res.status(500).json({
                  status: 'error',
                  message: _context4.t0.message
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function deleteUser(_x7, _x8) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;