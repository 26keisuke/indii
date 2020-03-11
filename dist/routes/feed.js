"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Post = _interopRequireDefault(require("../models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import mongoose from "mongoose";
// import equal from "deep-equal"
// import User from "../models/User"
// import Topic from "../models/Topic"
// import Draft from "../models/Draft"
// import Image from "../models/Image"
var router = _express["default"].Router();

router.get("/", function (req, res) {
  // Post.find({contribution: { $exists: true, $ne: [] }}).sort({contribution: 1}).limit(10)
  _Post["default"].find({
    lastEdited: {
      $exists: true
    }
  }).sort({
    lastEdited: -1
  }).limit(10).populate("creator").then(function (posts) {
    res.send(posts);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.get("/search/:term", function (req, res) {
  console.log("A TERM \"".concat(req.params.term, "\" HAS BEEN SEARCHED"));
  res.send("");
});
router.post("/feedback", function (req, res) {
  console.log("Feedback Received! \n", req.body);
  res.send("");
});
var _default = router;
exports["default"] = _default;