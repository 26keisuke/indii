"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _Topic = _interopRequireDefault(require("../models/Topic"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _Draft = _interopRequireDefault(require("../models/Draft"));

var _util = require("./util/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/:postId", function (req, res) {
  _Post["default"].findById(req.params.postId).populate({
    path: "topic",
    populate: {
      path: "rectangleImg"
    }
  }).populate("creator").exec().then(function (post) {
    res.send(post);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:postId/edit", _util.isLoggedIn, function (req, res) {
  _Post["default"].findById(req.params.postId).then(function (post) {
    var type = post.index[0] === 0 ? "Zero" : "Edit";
    var lastContribution = post.contribution[post.contribution.length - 1];
    var data = {
      user: req.user.id,
      type: type,
      creationDate: Date.now(),
      topic: post.topic,
      topicName: post.topicName,
      topicSquareImg: post.topicSquareImg,
      postName: post.postName,
      postImg: post.postImg,
      content: post.content,
      editPostImg: post.postImg,
      editContent: post.content,
      editPostName: post.postName,
      editPostId: post._id,
      editCreator: post.creator,
      editCreationDate: post.creationDate,
      editRef: post.ref,
      editLastEdited: type !== "New" && lastContribution && lastContribution.timeStamp,
      editLastEditedAuthor: type !== "New" && lastContribution && lastContribution.user,
      editIndex: post.index,
      ref: post.ref,
      config: {
        allowEdit: post.config.allowEdit
      }
    };
    new _Draft["default"](data).save().then(function (draft) {
      _User["default"].findById(req.user.id).then(function (user) {
        user.draft.push(draft);
        user.save().then(res.send("Success"));
      });
    })["catch"](function (err) {
      console.log(err);
      res.send("Fail");
    });
  });
}); //　通知

router.post("/:postId/star", _util.isLoggedIn, function (req, res) {
  var now = Date.now();

  _Post["default"].findById(req.params.postId).then(function (post) {
    // postの変更
    if (!req.body.like) {
      post.star.action.map(function (elem, index) {
        if (String(elem.user) === String(req.user.id)) {
          post.star.action.splice(index, 1);
          post.star.counter--;
        }
      });
    } else {
      var _res = post.star.action.filter(function (elem) {
        return String(elem.user) === String(req.user.id);
      });

      if (!_res[0]) {
        post.star.counter++;
        post.star.action.push({
          timeStamp: now,
          user: req.user.id
        });
      }
    } // post ownerの変更


    _User["default"].findById(post.creator).then(function (user) {
      if (!req.body.like) {
        user.notif.push({
          timeStamp: now,
          type: "POST_LIKE",
          user: req.user.id,
          post: post._id
        });
      } else {
        user.notif.map(function (elem, index) {
          if (elem.type === "POST_LIKE" && elem.post === post._id) {
            user.notif.splice(index, 1);
          }
        });
      }
    }); // req.userの変更


    _User["default"].findById(req.user.id).then(function (user) {
      if (!req.body.like) {
        user.likedPost.map(function (elem, index) {
          if (String(elem.post) === String(post.id)) {
            user.likedPost.splice(index, 1);
          }
        });
      } else {
        var _res2 = user.likedPost.filter(function (elem) {
          return String(elem.post) === String(post.id);
        });

        if (!_res2[0]) {
          user.likedPost.push({
            timeStamp: now,
            post: post.id
          });
        }
      }

      post.save();
      user.save();
      res.send("DONE");
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); //　通知

router.post("/:postId/emoji", _util.isLoggedIn, function (req, res) {
  var now = Date.now();

  _Post["default"].findById(req.params.postId).then(function (post) {
    // postの変更
    if (!req.body.emoji) {
      post.rating.map(function (elem, index) {
        if (String(elem.user) === String(req.user.id)) {
          post.rating.splice(index, 1);
        }
      });
    } else {
      var _res3 = post.rating.map(function (elem) {
        if (String(elem.user) === String(req.user.id)) {
          elem.rate = req.body.emoji;
          elem.timeStamp = now;
          return true;
        }
      });

      if (!_res3[0]) {
        post.rating.push({
          timeStamp: now,
          user: req.user.id,
          rate: req.body.emoji
        });
      }
    } // post ownerの変更


    _User["default"].findById(post.creator).then(function (owner) {
      if (!req.body.emoji) {
        owner.notif.map(function (elem, index) {
          if (elem.type === "POST_EMOJI" && elem.post === post._id) {
            owner.notif.splice(index, 1);
          }
        });
      } else {
        var _res4 = owner.notif.map(function (elem) {
          if (String(elem.post) === String(post.id)) {
            elem.emoji = req.body.emoji;
            elem.timeStamp = now;
            return true;
          }
        });

        if (!_res4[0]) {
          owner.notif.push({
            timeStamp: now,
            type: "POST_EMOJI",
            user: req.user.id,
            post: post._id,
            emoji: req.body.emoji
          });
        }
      } // req.userの変更


      _User["default"].findById(req.user.id).then(function (user) {
        if (!req.body.emoji) {
          user.postRating.map(function (elem, index) {
            if (String(elem.post) === String(post.id)) {
              user.postRating.splice(index, 1);
            }
          });
        } else {
          var _res5 = user.postRating.map(function (elem) {
            if (String(elem.post) === String(post.id)) {
              elem.rate = req.body.emoji;
              elem.timeStamp = now;
              return true;
            }
          });

          if (!_res5[0]) {
            user.postRating.push({
              timeStamp: now,
              post: post.id,
              rate: req.body.emoji
            });
          }
        }

        owner.save();
        post.save();
        user.save();
        res.send("DONE");
      });
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/delete", function (req, res) {
  console.log("DELETING ".concat(req.body.id));
  res.send("");
}); // post searchはtopicId内で検索するやり方と、postIdでpost全体から検索する方法の二種類
// Method 1

router.get("/search/:type/:term/:topicId", function (req, res) {
  var type = req.params.type;
  var value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$'; // ここのpostImgの方はpopulateされない可能性あり

  _Topic["default"].findById(req.params.topicId).populate({
    path: "posts",
    populate: [{
      path: "topicSquareImg"
    }, {
      path: "postImg"
    }]
  }).exec().then(function (topic) {
    var result = [];
    var regEx = new RegExp(value);

    for (var k in topic.posts) {
      if (regEx.exec(topic.posts[k].postName)) {
        result.push(topic.posts[k]);
      }
    }

    if (result.length === 0) {
      result = type === "Match" ? [] : [{
        added: true
      }];
    }

    res.send(result);
  })["catch"](function (err) {
    console.log(err);
    res.send([]);
  });
}); // Method 2

router.get("/search/:type/:term", function (req, res) {
  var type = req.params.type;
  var value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$';

  _Post["default"].find({
    "postName": {
      $regex: value,
      $options: 'i'
    }
  }).populate("postImg").populate("topicSquareImg").exec().then(function (post) {
    if (post.length === 0) {
      var result = type === "Match" ? [] : [{
        added: true
      }];
      res.send(result);
    } else {
      res.send(post);
    }
  })["catch"](function (err) {
    console.log(err);
    res.send([]);
  });
});
var _default = router;
exports["default"] = _default;