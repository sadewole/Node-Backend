"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _db["default"].User;
var Helper = {
  // generate hashed password for user
  hashPassword: function hashPassword(password) {
    return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
  },
  // check password validation
  comparePassword: function comparePassword(password, hashPassword) {
    return _bcryptjs["default"].compareSync(password, hashPassword);
  },
  // check for existing email
  existEmail: function existEmail(email) {
    return User.findOne({
      where: {
        email: email
      }
    });
  },
  // check for existing id
  existUserById: function existUserById(id) {
    return User.findOne({
      where: {
        id: id
      }
    });
  },

  /** Validate user schems */
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var result = _joi["default"].validate(req.body, schema);

      if (result.error) {
        return res.status(400).json({
          message: result.error
        });
      } // check if req.value


      if (!req.value) req.value = {};
      req.value.body = result.value;
      next();
    };
  },
  schemas: {
    authSchema: _joi["default"].object().keys({
      fname: _joi["default"].string().required(),
      lname: _joi["default"].string().required(),
      phone: _joi["default"].number().required(),
      email: _joi["default"].string().email().required(),
      password: _joi["default"].string().required()
    }),
    signSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required(),
      password: _joi["default"].string().required()
    })
  }
};
var _default = Helper;
exports["default"] = _default;