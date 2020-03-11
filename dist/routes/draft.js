"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var _User = _interopRequireDefault(require("../models/User"));

var _Topic = _interopRequireDefault(require("../models/Topic"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _Draft = _interopRequireDefault(require("../models/Draft"));

var _Image = _interopRequireDefault(require("../models/Image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", function (req, res) {
  _User["default"].findById(req.user.id).then(function (user) {
    _Draft["default"].find({
      _id: {
        $in: user.draft
      },
      isDeleted: false,
      isUploaded: false
    }).populate("topicSquareImg").populate("postImg").populate("editCreator").populate("editLastEditedAuthor").exec() // 最後の二つのpopulateはいらないかもしれない
    .then(function (draft) {
      res.send(draft);
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.get("/:draftId", function (req, res) {
  _Draft["default"].findById(req.params.draftId).populate("editCreator").populate("editLastEditedAuthor").exec().then(function (draft) {
    res.send(draft);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/upload", function (req, res) {
  var _req$body$value = req.body.value,
      draftId = _req$body$value.draftId,
      index = _req$body$value.index,
      addColumn = _req$body$value.addColumn;

  _Draft["default"].findById(draftId).populate("postImg").populate("editCreator").then(function (draft) {
    var now = Date.now();

    if (draft.type !== "New") {
      if (draft.config.allowEdit === false && draft.editCreator._id !== req.user.id) {
        _User["default"].findById(draft.editCreator).then(function (user) {
          draft.editUploadedDate = now;
          user.notif.push({
            timeStamp: now,
            type: "POST_EDIT",
            user: req.user.id,
            post: draft.editPostId,
            draft: draft._id
          });
          draft.save();
          user.save();
          res.send("Success");
          return;
        });

        return;
      }

      _Post["default"].findById(draft.editPostId).then(function (post) {
        if (post.content !== draft.content) {
          post.content = draft.content;
        }

        if (post.ref !== draft.ref) {
          post.ref = draft.ref;
        }

        if (post.postName !== draft.postName) {
          post.postName = draft.postName;
        } //まだ何も変更できないが、将来的には変更できるようにしたい


        if (post.postImg !== draft.postImg) {
          var _imgId = _mongoose["default"].Types.ObjectId();

          new _Image["default"]({
            _id: _imgId,
            image: draft.postImg.image
          }).save();
          post.postImg = _imgId;
        }

        post.contribution.push({
          user: req.user.id,
          timeStamp: now
        });
        draft.isUploaded = true;

        _Topic["default"].findById(post.topic).then(function (topicElem) {
          topicElem.activity.push({
            timeStamp: now,
            user: req.user.id,
            type: "EDIT_POST",
            postName: draft.postName
          });
          topicElem.save();
          post.save();
          draft.save();
          res.send("Success");
          return;
        });
      });

      return;
    }

    var imgId = _mongoose["default"].Types.ObjectId();

    var topic = draft.topic,
        topicName = draft.topicName,
        postName = draft.postName,
        postImg = draft.postImg,
        content = draft.content,
        ref = draft.ref,
        config = draft.config,
        topicRectangleImg = draft.topicRectangleImg,
        topicSquareImg = draft.topicSquareImg,
        topicMobileImg = draft.topicMobileImg;

    if (postImg) {
      new _Image["default"]({
        _id: imgId,
        image: postImg
      }).save();
    }

    var newIndex = index.slice();

    if (addColumn === true) {
      newIndex[0] = index[0] + 1;
      newIndex[1] = 0;
    } else {
      newIndex[1] = index[1] + 1;
    }

    var data = {
      topic: topic,
      topicName: topicName,
      topicRectangleImg: topicRectangleImg,
      topicSquareImg: topicSquareImg,
      topicMobileImg: topicMobileImg,
      postName: postName,
      postImg: postImg ? imgId : undefined,
      index: newIndex,
      content: content,
      ref: ref,
      creator: req.user.id,
      creationDate: now,
      lastEdited: now,
      config: config
    };
    var post = new _Post["default"](data);
    post.contribution.push({
      timeStamp: now,
      user: req.user.id
    });
    post.save().then(function (newPost) {
      _Topic["default"].findById(topic).populate("posts").then(function (topicElem) {
        console.log("********UPDATING TOPICS********");

        if (addColumn) {
          var columnId = _mongoose["default"].Types.ObjectId();

          var threshold = index[0] + 1; // topicElem.columnをupdate

          for (var k in topicElem.column) {
            if (topicElem.column[k].index >= threshold) {
              topicElem.column[k].index = topicElem.column[k].index + 1;
            }
          }

          var newColumn = {
            _id: columnId,
            index: threshold,
            title: postName,
            posts: []
          };
          newColumn.posts.push(newPost);
          topicElem.splice(threshold, 0, newColumn); // topicElem.column.push(newColumn) <- これだと、順番がそろわない（columnは順番がそろわなくてはいけない）
          // topicElem.postsをupdate

          var promises = [];

          for (var l in topicElem.posts) {
            if (topicElem.posts[l].index[0] >= threshold) {
              promises.push(_Post["default"].update({
                _id: topicElem.posts[l]._id
              }, {
                $inc: {
                  "index.0": 1
                }
              }));
            }
          }

          Promise.all(promises).then(function () {
            // 注意: このthenの中にこいつらをいれないとupdateは反映されない
            topicElem.posts.push(newPost); // orderをupdate

            topicElem.order.splice(threshold, 0, columnId); // postCountをアップデート

            topicElem.postCount++;
            topicElem.activity.push({
              timeStamp: now,
              user: req.user.id,
              type: "CREATE_POST"
            });
            topicElem.save();
          });
        } else {
          var insertColumn = index[0];
          var insertIndex = index[1] + 1; // topicElem.postsをupdate

          var promises = [];

          for (var l in topicElem.posts) {
            if (topicElem.posts[l].index[0] === insertColumn && topicElem.posts[l].index[1] >= insertIndex) {
              // Warning: topicElemから.save()してもできないので、Postをもう一回取ってくるようにしている
              promises.push(_Post["default"].update({
                _id: topicElem.posts[l]._id
              }, {
                $inc: {
                  "index.1": 1
                }
              }));
            }
          }

          Promise.all(promises).then(function () {
            topicElem.posts.push(newPost); // topicElem.column.postsをupdate

            for (var m in topicElem.column) {
              if (topicElem.column[m].index === insertColumn) {
                topicElem.column[m].posts.splice(insertIndex, 0, newPost);
              }
            } // postCountをアップデート


            topicElem.postCount++;
            topicElem.activity.push({
              timeStamp: now,
              user: req.user.id,
              type: "CREATE_POST"
            });
            topicElem.save();
          });
        }

        draft.isUploaded = true;
        draft.save().then(res.send("Success: /api/draft/upload"));
      });
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/delete", function (req, res) {
  _Draft["default"].updateMany({
    _id: {
      $in: req.body.subject
    }
  }, {
    $set: {
      isDeleted: true
    }
  }, {
    $push: {
      editDate: Date.now()
    }
  }).then(function (draft) {
    res.send("Success: /api/draft/delete");
  });
});
router.post("/edit", function (req, res) {
  var now = Date.now();
  var _req$body = req.body,
      draftId = _req$body.draftId,
      accept = _req$body.accept,
      comment = _req$body.comment,
      feedback = _req$body.feedback;

  _Draft["default"].findById(draftId).populate("postImg").then(function (draft) {
    if (accept) {
      _Post["default"].findById(draft.editPostId).then(function (post) {
        post.lastEdited = now;
        post.contribution.push({
          timeStamp: now,
          user: draft.user
        });
        post.postName = post.postName !== draft.postName ? draft.postName : post.postName;
        post.content = post.content !== draft.content ? draft.content : post.content;

        if (draft.postImg && !(0, _deepEqual["default"])(post.postImg, draft.postImg.image)) {
          var imgId = _mongoose["default"].Types.ObjectId();

          new _Image["default"]({
            _id: imgId,
            image: draft.postImg.image
          }).save();
          post.postImg = imgId;
        }

        if (!(0, _deepEqual["default"])(post.ref, draft.ref)) {
          post.ref = draft.ref;
        }

        _User["default"].findById(draft.user).then(function (user) {
          user.notif.push({
            timeStamp: now,
            type: "POST_EDIT_FEEDBACK",
            user: req.user.id,
            emoji: feedback,
            draft: draftId,
            // これはallowEditがfalseの場合に必要
            post: post._id,
            topic: post.topic,
            comment: comment,
            // これはPOST_EDIT_FEEDBACKの時のみ必要
            isApproved: accept // これはPOST_EDIT_FEEDBACKの時のみ必要

          });
          draft.isApproved = "APPROVE";
          draft.editConfirmedDate = now;
          draft.comment = comment;

          _Topic["default"].findById(post.topic).then(function (topicElem) {
            topicElem.activity.push({
              timeStamp: now,
              user: req.user.id,
              type: "EDIT_POST",
              postName: draft.postName
            });
            topicElem.save();
            draft.save();
            post.save();
            user.save();
            res.send(accept);
            return;
          });
        });
      });
    } else {
      _User["default"].findById(draft.user).then(function (user) {
        user.notif.push({
          timeStamp: now,
          type: "POST_EDIT_FEEDBACK",
          user: req.user.id,
          emoji: feedback,
          draft: draftId,
          // これはallowEditがfalseの場合に必要
          comment: comment,
          // これはPOST_EDIT_FEEDBACKの時のみ必要
          isApproved: accept // これはPOST_EDIT_FEEDBACKの時のみ必要

        });
        draft.isApproved = "REJECT";
        draft.editConfirmedDate = now;
        draft.save();
        user.save();
        res.send(accept);
      });
    }
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:id", function (req, res) {
  _Draft["default"].findById(req.params.id).then(function (draft) {
    draft.content = req.body.content;

    if (req.body.timeUpdate !== false) {
      draft.editDate.push(Date.now());
    }

    draft.save().then(function (draft) {
      res.send("Sucess: POST /api/draft/:id");
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:id/name", function (req, res) {
  _Draft["default"].findById(req.params.id).then(function (draft) {
    if (req.body.revert) {
      if (draft.type === "Edit") {
        _Post["default"].findById(draft.editPostId).then(function (post) {
          console.log(post.postName);
          draft.postName = post.postName;
          draft.save().then(res.send("Success"));
        });
      }
    } else {
      draft.postName = req.body.value;
      draft.save().then(res.send("Success"));
    }
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:id/config", function (req, res) {
  _Draft["default"].findById(req.params.id).then(function (draft) {
    draft.config[req.body.config] = !draft.config[req.body.config];
    draft.save().then(res.send("Success"));
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:id/tag", function (req, res) {
  _Draft["default"].findById(req.params.id).then(function (draft) {
    console.log("CALLED");
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:id/image", function (req, res) {
  var imgId = _mongoose["default"].Types.ObjectId();

  new _Image["default"]({
    _id: imgId,
    image: req.body.img
  }).save();

  _Draft["default"].findById(req.params.id).then(function (draft) {
    draft.postImg = imgId;
    draft.save().then(res.send("Success: /api/draft/:id/image"));
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/:id/ref", function (req, res) {
  _Draft["default"].findById(req.params.id).then(function (draft) {
    draft.ref.push(req.body.ref);
    draft.save().then(res.send("Success: /api/draft/:id/ref"));
  })["catch"](function (err) {
    console.log(err);
  });
});
router["delete"]("/:id/ref/:refId", function (req, res) {
  _Draft["default"].findById(req.params.id).then(function (draft) {
    for (var k in draft.ref) {
      if (String(draft.ref[k]._id) === String(req.params.refId)) {
        draft.ref[k].isDeleted = true;
        break;
      }
    }

    draft.save().then(res.send("Sucess: /api/draft/:id/ref/:refId"));
  });
});
var _default = router;
exports["default"] = _default;