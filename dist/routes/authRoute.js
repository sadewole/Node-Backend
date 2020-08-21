"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _helpers = _interopRequireDefault(require("../middlewares/helpers"));

var _passport = _interopRequireDefault(require("passport"));

require("../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/auth/signup', _helpers["default"].validateBody(_helpers["default"].schemas.authSchema), _authController["default"].signUp);
router.post('/auth/signin', _passport["default"].authenticate('local', {
  session: false
}), _helpers["default"].validateBody(_helpers["default"].schemas.signSchema), _authController["default"].signIn); // Routes get secretPass
// Access private

router.route('/auth/secret').get(_passport["default"].authenticate('jwt', {
  session: false
}), _authController["default"].secret);
var _default = router;
exports["default"] = _default;