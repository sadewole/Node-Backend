"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _authRoute = _interopRequireDefault(require("./routes/authRoute"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _path = _interopRequireDefault(require("path"));

var _models = _interopRequireDefault(require("./models"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT; // middlewares

app.use((0, _morgan["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // routes

app.use('/api/v1', _authRoute["default"], _userRoute["default"]);

var server = _http["default"].createServer(app); // server.listen(PORT, () => {
//   console.log('Server running on PORT:', PORT)
// })
// test database
// try {
//   db.sequelize.authenticate()
//   console.log('DB connection has been established successfully.');
// } catch (err) {
//   console.error('Unable to connect to the database:', err);
// }
// sync database


_models["default"].sequelize.sync().then(function () {
  console.log('DB connection has been established successfully.');
}).then(function () {
  // listen to server
  server.listen(PORT, function () {
    console.log('Server running on PORT:', PORT);
  });
});