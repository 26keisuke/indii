"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  isVerified: {
    type: Boolean,
    "default": false
  },
  verifiedDate: Date,
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true
  },
  userName: String,
  email: String,
  password: String,
  name: {
    familyName: String,
    givenName: String
  },
  photo: String,
  comment: String,
  intro: String,
  followers: [{
    timeStamp: Date,
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  follows: [{
    timeStamp: Date,
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  draft: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Draft"
  }],
  post: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }],
  // こっから下はactivity関連。全てactivityにぶっこんでもいいが、将来的には、
  // それぞれに入れるべき要素が増えていくだろうから、分けた方がいい
  editPost: [{
    timeStamp: Date,
    post: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Post"
    }
  }],
  editTopic: [{
    timeStamp: Date,
    topic: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Topic"
    }
  }],
  createTopic: [{
    timeStamp: Date,
    topic: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Topic"
    }
  }],
  likedPost: [{
    timeStamp: Date,
    post: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Post"
    }
  }],
  postRating: [{
    // emoji
    timeStamp: Date,
    post: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Post"
    },
    rate: Number
  }],
  likedTopic: [{
    timeStamp: Date,
    topic: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Topic"
    }
  }],
  notif: [{
    timeStamp: Date,
    type: {
      type: String,
      "enum": ["POST_EMOJI", "POST_LIKE", "FOLLOWED", "POST_EDIT", "POST_EDIT_FEEDBACK"]
    },
    user: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "User"
    },
    checked: {
      type: Boolean,
      "default": false
    },
    post: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Post"
    },
    // これはPOSTの場合に必要
    emoji: String,
    // これはPOST&POST_EDIT_FEEDBACKの場合に必要
    draft: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Draft"
    },
    // これはallowEditがfalseの場合に必要
    comment: String,
    // これはPOST_EDIT_FEEDBACKの時のみ必要
    isApproved: Boolean // これはPOST_EDIT_FEEDBACKの時のみ必要

  }],
  // confirm: [{
  //     timeStamp: Date,
  //     draft: { type: mongoose.Schema.Types.ObjectId, ref: "Draft" },
  //     user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  //     isConfirmed: Boolean,
  // }],
  activity: [{
    timeStamp: Date,
    type: {
      type: String,
      "enum": ["LOG_IN", "LOG_OUT"]
    }
  }]
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;