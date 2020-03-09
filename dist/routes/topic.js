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

var _util = require("./util/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", _util.isLoggedIn, function (req, res) {
  var columnId = _mongoose["default"].Types.ObjectId();

  var topicId = _mongoose["default"].Types.ObjectId();

  var topicRectangleImgId = _mongoose["default"].Types.ObjectId();

  var topicSquareImgId = _mongoose["default"].Types.ObjectId();

  var topicMobileImgId = _mongoose["default"].Types.ObjectId();

  var ls = [{
    _id: topicRectangleImgId,
    image: req.body.rectangleImg
  }, {
    _id: topicSquareImgId,
    image: req.body.squareImg
  }, {
    _id: topicMobileImgId,
    image: req.body.mobileImg
  }];

  _Image["default"].insertMany(ls);

  var newBody = Object.assign({}, req.body, {
    squareImg: topicSquareImgId,
    rectangleImg: topicRectangleImgId,
    mobileImg: topicMobileImgId
  });
  var post = new _Post["default"]({
    topic: topicId,
    topicName: req.body.topicName,
    topicRectangleImg: topicRectangleImgId,
    topicSquareImg: topicSquareImgId,
    topicMobileImg: topicMobileImgId,
    index: [0],
    postName: "概要"
  });
  post.save().then(function (post) {
    var desc = {
      _id: columnId,
      index: 0,
      // Column別にrenderする時に役に立つ
      title: "概要",
      posts: [post.id]
    };
    var now = Date.now();
    var topic = new _Topic["default"](Object.assign({
      _id: topicId
    }, newBody));
    topic.column.push(desc);
    topic.order.push(columnId);
    topic.posts.push(post.id);
    topic.postCount++;
    topic.activity.push({
      timeStamp: now,
      user: req.user.id,
      type: "CREATE_TOPIC"
    });

    _User["default"].findById(req.user.id).then(function (user) {
      user.createTopic.push({
        timeStamp: now,
        topic: topicId
      });
      user.save().then(function () {
        topic.save().then(function () {
          res.send("Success: POST /api/topic");
        })["catch"](function (err) {
          console.log(err);
        });
      });
    });
  });
});
router.post("/:topicId/edit", _util.isLoggedIn, function (req, res) {
  _Topic["default"].findById(req.params.topicId).populate("posts") // populateした方がパフォーマンスが上がるのかは不明
  .then(function (topic) {
    var _req$body = req.body,
        mobileImg = _req$body.mobileImg,
        rectangleImg = _req$body.rectangleImg,
        squareImg = _req$body.squareImg,
        tags = _req$body.tags,
        posts = _req$body.posts,
        columns = _req$body.columns,
        order = _req$body.order; // TOPIC PHASE
    // check if each image is changed, create new image with OBJID, then insert

    var id;
    var imgList = [];

    if (topic.squareImg !== squareImg) {
      id = _mongoose["default"].Types.ObjectId();
      imgList.push({
        _id: id,
        image: squareImg
      });
      topic.squareImg = id;
    }

    if (topic.rectangleImg !== rectangleImg) {
      id = _mongoose["default"].Types.ObjectId();
      imgList.push({
        _id: id,
        image: rectangleImg
      });
      topic.rectangleImg = id;
    }

    if (topic.mobileImg !== mobileImg) {
      id = _mongoose["default"].Types.ObjectId();
      imgList.push({
        _id: id,
        image: mobileImg
      });
      topic.mobileImg = id;
    }

    if (imgList.length > 0) {
      _Image["default"].insertMany(imgList);
    } // check if tags are changed => if yes replace


    if (topic.tags !== tags) {
      topic.tags = tags;
    } // convert strings to OBJIDS and check if orders are changed => if yes replace


    var orderList = [];

    for (var i = 0; i < order.length; i++) {
      orderList.push(_mongoose["default"].Types.ObjectId(order[i]));
    }

    if (!(0, _deepEqual["default"])(topic.order, orderList)) {
      topic.order = orderList;
    } // while converting _id string to OBJID, check if values are changed


    var result = columnCheckModified(columns, topic.column);

    if (result[0]) {
      topic.column = result[1];
    } // POST PHASE
    // check if posts are changed(if column is changed, post is always changed) => if yes replace


    var promises = [];

    if (result[0]) {
      promises = modifyPostIndex(posts, topic.posts);
    }

    var now = Date.now(); // 同じ Date.now()でuserとtopic schemaで揃える
    // activityに追加

    Promise.all(promises).then(function () {
      topic.activity.push({
        type: "EDIT_TOPIC",
        user: req.user.id,
        timeStamp: now
      });

      _User["default"].findById(req.user.id).then(function (user) {
        // editTopicを追加する
        user.editTopic.push({
          timeStamp: now,
          topic: topic._id
        });
        topic.save();
        user.save();
        res.send("Success");
      });
    });
  })["catch"](function (err) {
    console.log(err);
  });
});

function arrObjLookUp(obj, field, attr) {
  for (var i = 0; i < obj.length; i++) {
    if ((0, _deepEqual["default"])(obj[i][field], attr)) {
      return obj[i];
    }
  }

  return;
}

function modifyPostIndex(newPosts, oldPosts) {
  var promises = [];
  var id;
  var lookUp;
  var columnIdxChnaged;
  var postIdxChanged;

  for (var j = 0; j < newPosts.length; j++) {
    id = _mongoose["default"].Types.ObjectId(newPosts[j]._id);
    lookUp = arrObjLookUp(oldPosts, "_id", id);

    if (!(0, _deepEqual["default"])(newPosts[j].index, lookUp.index)) {
      columnIdxChnaged = newPosts[j].index[0] - lookUp.index[0];
      postIdxChanged = newPosts[j].index[1] - lookUp.index[1];
      console.log("FROM => TO: ", lookUp.index, newPosts[j].index, newPosts[j].postName);
      console.log("CHANGE IN VALUE :: (COLUMN, INDEX) => ", "(", columnIdxChnaged, ",", postIdxChanged, ")");
      promises.push(_Post["default"].updateOne({
        _id: id
      }, {
        $inc: {
          "index.0": columnIdxChnaged,
          "index.1": postIdxChanged
        }
      }));
    }
  }

  return promises;
}

function columnCheckModified(newColumn, oldColumn) {
  var flag = false;

  for (var j = 0; j < newColumn.length; j++) {
    newColumn[j]._id = _mongoose["default"].Types.ObjectId(newColumn[j]._id);

    if (oldColumn[j]) {
      flag = !(0, _deepEqual["default"])(newColumn[j]._id, oldColumn[j]._id);
    } else {
      flag = true;
    }

    if (flag === true) {
      break;
    }

    for (var k = 0; k < newColumn[j].posts.length; k++) {
      newColumn[j].posts[k] = _mongoose["default"].Types.ObjectId(newColumn[j].posts[k]);

      if (oldColumn[j].posts[k]) {
        flag = !(0, _deepEqual["default"])(newColumn[j].posts[k]._id, oldColumn[j].posts[k]._id);
      } else {
        flag = true;
      }

      if (flag === true) {
        break;
      }
    }
  }

  return [flag, newColumn];
}

router.post("/:topicId/post", _util.isLoggedIn, function (req, res) {
  var data = Object.assign({
    user: req.user.id,
    type: "New",
    creationDate: Date.now()
  }, req.body);
  new _Draft["default"](data).save().then(function (draft) {
    _User["default"].findById(req.user.id).then(function (user) {
      user.draft.push(draft);
      user.save().then(res.send("Success: POST /api/topic/:topicId/post"));
    });
  })["catch"](function (err) {
    console.log(err);
    res.send("Fail: POST /api/topic/:topicId/post");
  });
});
router.get("/:topicId/:type", function (req, res) {
  var type = req.params.type;

  switch (type) {
    case "ALL":
      _Topic["default"].findById(req.params.topicId).populate("rectangleImg").populate("mobileImg").populate("squareImg") // .populate({path: "column.posts", populate: {path: "postImg"}})
      .populate({
        path: "posts",
        populate: [{
          path: "postImg"
        }, {
          path: "creator"
        }]
      }).populate("activity.user").exec().then(function (topic) {
        res.send(topic);
      })["catch"](function (err) {
        console.log(err);
      });

      return;

    case "INDEX":
      _Topic["default"].findById(req.params.topicId).populate("column.posts").exec().then(function (topic) {
        res.send(topic);
      })["catch"](function (err) {
        console.log(err);
      });

      return;

    default:
      return;
  }
});
router.get("/search/:type/:term", function (req, res) {
  var type = req.params.type;
  var value = type === "Match" ? '^' + req.params.term : '^' + req.params.term + '$';

  _Topic["default"].find({
    "topicName": {
      $regex: value,
      $options: 'i'
    }
  }).populate("squareImg").exec().then(function (topic) {
    if (topic.length === 0) {
      var result = type === "Match" ? [] : [{
        added: true
      }];
      res.send(result);
    } else {
      res.send(topic);
    }
  })["catch"](function (err) {
    console.log(err);
    res.send([]);
  });
});
var _default = router;
exports["default"] = _default;