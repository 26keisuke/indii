"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var postSchema = new Schema({
  topic: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Topic"
  },
  topicName: String,
  // for fast lookup
  topicRectangleImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  topicSquareImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  topicMobileImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  // おそらくこいつはいらないと思うが一応
  index: [Number],
  // 2.1の場合は[2,1]
  postName: String,
  postImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  content: String,
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  creationDate: Date,
  lastEdited: Date,
  contribution: [{
    // 今のところはただ単にeditされたらここにappendする感じ
    timeStamp: Date,
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  state: {
    "delete": Boolean,
    warn: Boolean
  },
  feedback: [{
    // report 
    timeStamp: Date,
    type: {
      type: String,
      "enum": [""]
    },
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  rating: [{
    // emoji
    timeStamp: Date,
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    },
    rate: Number
  }],
  star: {
    counter: {
      type: Number,
      "default": 0
    },
    action: [{
      // userは全てuniqueじゃなきゃいけない
      timeStamp: Date,
      user: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User"
      }
    }]
  },
  // まだいい
  // reader: [{
  //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //     startTimeStamp: Date,
  //     endTimeStamp: Date,
  // }],
  config: {
    allowEdit: {
      type: Boolean,
      "default": true
    }
  },
  ref: [{
    refType: String,
    title: String,
    url: String,
    author: String,
    postDate: Date,
    website: String,
    source: String,
    date: Date,
    publishDate: Date,
    publisher: String,
    isbnurl: String,
    page: Number,
    doi: String,
    bookTitle: String,
    chapterTitle: String,
    editor: String,
    heldDate: Date,
    conferenceName: String,
    creator: String,
    creatorUrl: String,
    sourceUrl: String,
    licenseName: String,
    licenseUrl: String,
    licenseHolder: String,
    licenseDate: Date
  }]
});

var Post = _mongoose["default"].model("Post", postSchema);

var _default = Post;
exports["default"] = _default;