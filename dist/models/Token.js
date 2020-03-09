"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Reference
// https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
var Schema = _mongoose["default"].Schema;
var tokenSchema = new Schema({
  _userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true,
    "default": Date.now,
    expires: 43200
  } //12 hours

});

var Token = _mongoose["default"].model("Token", tokenSchema);

var _default = Token;
exports["default"] = _default;