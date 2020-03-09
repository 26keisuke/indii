"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var topicSchema = new Schema({
  topicName: String,
  squareImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  rectangleImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  mobileImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  tags: [String],
  column: [{
    index: Number,
    // Column Index: Column別にrenderする時に役に立つ
    title: String,
    posts: [{
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Post"
    }] // ordered

  }],
  order: [_mongoose["default"].ObjectId],
  // Column Order (by Id in "column")
  posts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }],
  // これに関しては、Indexの順番じゃなくていい
  likes: {
    type: Number,
    "default": 0
  },
  postCount: {
    type: Number,
    "default": 0
  },
  activity: [{
    type: {
      type: String,
      "enum": ["EDIT_POST", "CREATE_POST", "EDIT_TOPIC", "CREATE_TOPIC"]
    },
    postName: String,
    // for fast lookUp
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    },
    timeStamp: Date
  }]
});

var Topic = _mongoose["default"].model("Topic", topicSchema);

var _default = Topic;
exports["default"] = _default;