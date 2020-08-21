"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

require("../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.route('/user').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].fetchAllUser);
router.route('/user/:id').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].fetchSingleUser).put(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].updateUser)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].deleteUser);
var _default = router;
exports["default"] = _default;