"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/:userId", function (req, res) {
  _User["default"].findById(req.params.userId).populate("post").populate("followers.user").populate("follows.user").populate({
    path: "likedPost.post",
    populate: {
      path: "postImg"
    }
  }).populate({
    path: "likedTopic.topic",
    populate: {
      path: "squareImg"
    }
  }).exec().then(function (user) {
    res.send(user);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:userId/photo", function (req, res) {
  _User["default"].findById(req.params.userId).then(function (user) {
    user.photo = req.body.photo;
    user.save();
    res.send("Success");
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:userId/name", function (req, res) {
  _User["default"].findById(req.params.userId).then(function (user) {
    user.userName = req.body.userName;
    user.save();
    res.send("Success");
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:userId/comment", function (req, res) {
  _User["default"].findById(req.params.userId).then(function (user) {
    user.comment = req.body.comment;
    user.save();
    res.send("Success");
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:userId/intro", function (req, res) {
  _User["default"].findById(req.params.userId).then(function (user) {
    user.intro = req.body.intro;
    user.save();
    res.send("Success");
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:userId/follow", function (req, res) {
  var now = Date.now(); // 対象者

  _User["default"].findById(req.params.userId).then(function (target) {
    if (req.body.follow) {
      var _res = target.followers.filter(function (user) {
        return String(user.user) === String(req.user.id);
      });

      if (!_res[0]) {
        target.followers.push({
          timeStamp: now,
          user: req.user.id
        }); // 対象者に通知を送る

        target.notif.push({
          timeStamp: now,
          type: "FOLLOWED",
          user: req.user.id
        });
      }
    } else {
      target.followers.map(function (user, index) {
        if (String(user.user) === String(req.user.id)) {
          target.followers.splice(index, 1);
        }
      }); // 対象者の通知から削除

      target.notif.map(function (user, index) {
        if (String(user.user) === String(req.user.id)) {
          target.notif.splice(index, 1);
        }
      });
    } // 自分


    _User["default"].findById(req.user.id).then(function (subject) {
      if (req.body.follow) {
        var _res2 = subject.follows.filter(function (user) {
          return String(user.user) === String(target._id);
        });

        if (!_res2[0]) {
          subject.follows.push({
            timeStamp: now,
            user: target.id
          });
        }
      } else {
        subject.follows.map(function (user, index) {
          if (String(user.user) === String(target.id)) {
            subject.follows.splice(index, 1);
          }
        });
      }

      target.save();
      subject.save();
      res.send("Success");
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
var _default = router;
exports["default"] = _default;