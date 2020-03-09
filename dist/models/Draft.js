"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var draftSchema = new Schema({
  topic: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Topic"
  },
  // for fast lookup
  topicName: String,
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
  postName: String,
  postImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  creationDate: Date,
  editDate: [Date],
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  content: String,
  config: {
    allowEdit: Boolean
  },
  type: {
    type: String,
    "enum": ["New", "Edit", "Zero"]
  },
  // zeroは概要Editする時
  isValid: {
    type: Boolean,
    "default": true
  },
  // 同じタイトルのコンテンツが他のユーザーによって投稿された場合
  isDeleted: {
    type: Boolean,
    "default": false
  },
  isUploaded: {
    type: Boolean,
    "default": false
  },
  isApproved: {
    type: String,
    "enum": ["APPROVE", "REJECT", "WAIT"],
    "default": "WAIT"
  },
  ref: [{
    refType: String,
    title: String,
    url: String,
    author: String,
    postDate: String,
    website: String,
    source: String,
    date: String,
    publishDate: String,
    publisher: String,
    isbnurl: String,
    page: String,
    doi: String,
    bookTitle: String,
    chapterTitle: String,
    editor: String,
    heldDate: String,
    conferenceName: String,
    creator: String,
    creatorUrl: String,
    sourceUrl: String,
    licenseName: String,
    licenseUrl: String,
    licenseHolder: String,
    licenseDate: String,
    isDeleted: {
      type: Boolean,
      "default": false
    }
  }],
  // 他のユーザーのポストをedit時のみに使うもの
  editPostName: String,
  editContent: String,
  editPostImg: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  },
  editPostId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  },
  editCreator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  editCreationDate: Date,
  editLastEdited: Date,
  editLastEditedAuthor: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  editIsConfirmed: {
    type: Boolean,
    "default": false
  },
  // こいつはallowEditの時に必要。後処理としてのログ。
  editUploadedDate: Date,
  editConfirmedDate: Date,
  editIndex: [Number],
  editComment: "",
  editRef: [{
    refType: String,
    title: String,
    url: String,
    author: String,
    postDate: String,
    website: String,
    source: String,
    date: String,
    publishDate: String,
    publisher: String,
    isbnurl: String,
    page: String,
    doi: String,
    bookTitle: String,
    chapterTitle: String,
    editor: String,
    heldDate: String,
    conferenceName: String,
    creator: String,
    creatorUrl: String,
    sourceUrl: String,
    licenseName: String,
    licenseUrl: String,
    licenseHolder: String,
    licenseDate: String,
    isDeleted: {
      type: Boolean,
      "default": false
    }
  }]
});

var Draft = _mongoose["default"].model("Draft", draftSchema);

var _default = Draft;
exports["default"] = _default;