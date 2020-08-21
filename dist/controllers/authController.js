"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _token2 = _interopRequireDefault(require("../middlewares/token"));

var _helpers = _interopRequireDefault(require("../middlewares/helpers"));

var _mailTemplate = _interopRequireDefault(require("../middlewares/mailTemplate"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User = _db["default"].User;
var baseUrl = process.env.BASE_URL;

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$value$body, fname, lname, email, phone, password, existingUser, hashPassword, newUser;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$value$body = req.value.body, fname = _req$value$body.fname, lname = _req$value$body.lname, email = _req$value$body.email, phone = _req$value$body.phone, password = _req$value$body.password;
                email = email.toLowerCase().trim();
                _context.next = 5;
                return _helpers["default"].existEmail(email);

              case 5:
                existingUser = _context.sent;

                if (!existingUser) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'User already exist'
                }));

              case 8:
                _context.next = 10;
                return _helpers["default"].hashPassword(password);

              case 10:
                hashPassword = _context.sent;
                _context.next = 13;
                return User.create({
                  id: (0, _uuid.v4)(),
                  fname: fname,
                  lname: lname,
                  email: email,
                  phone: phone,
                  password: hashPassword
                });

              case 13:
                newUser = _context.sent;
                res.status(201).json({
                  status: 'success',
                  data: newUser,
                  token: "Bearer ".concat(token),
                  message: 'Registered successfully'
                });
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  status: 'error',
                  message: _context.t0.message
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user, _token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = req.user;
                _context2.next = 4;
                return _token2["default"].generateToken(user);

              case 4:
                _token = _context2.sent;
                res.status(201).json({
                  status: 'success',
                  data: user,
                  token: "Bearer ".concat(_token),
                  message: 'Logged in successfully.'
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                res.status(500).json({
                  status: 'error',
                  message: _context2.t0.message
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;