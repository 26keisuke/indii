"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("../models/User"));

var _Token = _interopRequireDefault(require("../models/Token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/login", _passport["default"].authenticate("local", {
  failureRedirect: "/"
}), function (req, res) {
  if (req.body.remember) {
    req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
  }

  res.send(req.user);
});
router.get("/logout", function (req, res) {
  _User["default"].findById(req.user.id).then(function (user) {
    user.activity.push({
      timeStamp: Date.now(),
      type: "LOG_OUT"
    });
    user.save().then(function () {
      req.logout();
      res.redirect("/");
    });
  });
});
router.get("/current_user", function (req, res) {
  res.send(req.user);
});
router.get("/email/:id", function (req, res) {
  _User["default"].findOne({
    email: req.params.id
  }).then(function (result) {
    res.send(result === null);
  })["catch"](function (err) {
    console.error(err);
  });
}); // 本来はここでもう一段階emailを入力してもらうステップを置いて、POSTで確認するのが理想（tokenIdを取得すれば誰でもできちゃうから）

router.get("/confirmation/:tokenId", function (req, res) {
  _Token["default"].findOne({
    token: req.params.tokenId
  }).then(function (token) {
    _User["default"].findById({
      _id: token._userId
    }).then(function (user) {
      if (!user) {
        console.log("User not found");
        return;
      }

      if (user.isVerified) {
        console.log("User is already verified");
        return;
      }

      user.isVerified = true;
      user.verifiedDate = Date.now();
      user.save().then(function (user) {
        console.log("User is now verified");
        res.redirect("/");
      });
    });
  })["catch"](function (err) {
    console.log(err);
    res.redirect("/");
  });
});
router.post("/password/reset/:tokenId", function (req, res) {
  var _req$body = req.body,
      newPassword = _req$body.newPassword,
      confirmPassword = _req$body.confirmPassword;

  if (newPassword !== confirmPassword) {
    console.log("Password did not match");
    return;
  }

  _Token["default"].findOne({
    token: req.params.tokenId
  }).then(function (token) {
    _User["default"].findById({
      _id: token._userId
    }).then(function (user) {
      if (!user) {
        console.log("User not found");
        return;
      }

      bcrypt.genSalt(10).then(function (salt) {
        bcrypt.hash(newPassword, salt).then(function (hash) {
          user.password = hash;
          user.save().then(function (user) {
            console.log("A password has been set");
            res.send("SUCCESS");
          });
        });
      });
    });
  })["catch"](function (err) {
    console.log(err);
    res.send("FAIL");
  });
});
router.post("/password/reset/email", function (req, res) {
  _User["default"].findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      console.log("User not found");
      res.send("FAIL");
      return;
    }

    var token = new _Token["default"]({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });
    token.save().then(function (token) {
      var msg = {
        from: 'info@indii.jp',
        to: user.email,
        subject: '【Indii】 パスワードの再設定',
        text: "".concat(user.userName, "\u3055\u3093\n\n") + "以下のリンクをクリックすると、パスワードの再設定を行うことができます。\n\n" + "http://indii.jp/password/reset/".concat(token.token) + "\n"
      };
      sgMail.send(msg).then(function () {
        console.log("A password reset mail has been sent");
        res.send("SUCCESS");
      });
      return;
    });
  });
}); // ログインしなくてもパスワードが再設定できるが大丈夫なのか？

router.get("/password/reset/:tokenId", function (req, res) {
  _Token["default"].findOne({
    token: req.params.tokenId
  }).then(function (token) {
    _User["default"].findById({
      _id: token._userId
    }).then(function (user) {
      if (!user) {
        console.log("User not found");
        return;
      }

      res.redirect("/verification/password/".concat(req.params.tokenId));
    });
  })["catch"](function (err) {
    console.log(err);
    res.redirect("/");
  });
});
router.post("/resend", function (req, res) {
  _User["default"].findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      console.log("User not found");
      res.send("FAIL");
      res.redirect("/");
      return;
    }

    if (user.isVerified) {
      console.log("User is already verified");
      res.send("ALREADY");
      res.redirect("/");
      return;
    }

    var token = new _Token["default"]({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });
    token.save().then(function (token) {
      var msg = {
        from: 'info@indii.jp',
        to: user.email,
        subject: '【Indii】 確認メールの再送',
        text: "".concat(req.body.username, "\u3055\u3093\n\n") + "以下のリンクをクリックして、ご登録いただいたメールアドレスを認証してください。\n\n" + "http://indii.jp/api/confirmation/".concat(token.token) + "\n"
      };
      sgMail.send(msg).then(function () {
        console.log("A verfication mail has been resent");
        res.send("SUCCESS");
      });
      return;
    });
  });
}); // もしcurrent_userでもfollowersをpopulateしても平気そうならば、そっちの方がいいと思う。

router.get("/friend/:name", function (req, res) {
  _User["default"].findById(req.user.id).populate("followers.user").then(function (user) {
    var result = [];
    var regEx = RegExp('^' + req.params.name, 'i');

    if (user.followers.length === 0) {
      res.send([]);
      return;
    }

    for (var i = 0; i < user.followers.length; i++) {
      if (regEx.exec(user.followers[i].user.userName)) {
        result.push(user.followers[i].user);
      }
    }

    res.send(result);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.get("/notif", function (req, res) {
  _User["default"].findById(req.user.id).populate("notif.user").then(function (user) {
    user.notif.sort(compare);
    res.send(user.notif);
  })["catch"](function (err) {
    console.log(err);
  });
});

function compare(a, b) {
  if (a.timeStamp < b.timeStamp) {
    return 1;
  }

  if (a.timeStamp > b.timeStamp) {
    return -1;
  }

  return 0;
}

router.get("/notif/:notifId", function (req, res) {
  _User["default"].findById(req.user.id).populate("notif.user").populate({
    path: "notif.post",
    populate: [{
      path: "topicSquareImg"
    }, {
      path: "topic"
    }, {
      path: "creator"
    }, {
      path: "postImg"
    }]
  }).populate({
    path: "notif.draft",
    populate: [{
      path: "editLastEditedAuthor"
    }, {
      path: "postImg"
    }]
  }).then(function (user) {
    for (var i = 0; i < user.notif.length; i++) {
      if (String(user.notif[i]._id) === String(req.params.notifId)) {
        res.send(user.notif[i]);
        return;
      }
    }
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post("/notif/:notifId", function (req, res) {
  _User["default"].findById(req.user.id).populate("notif.user").then(function (user) {
    for (var i = 0; i < user.notif.length; i++) {
      if (String(user.notif[i]._id) === String(req.params.notifId)) {
        user.notif[i].checked = true;
        return;
      }
    }

    user.save();
    res.send("Done");
  })["catch"](function (err) {
    console.log(err);
  });
});
var _default = router;
exports["default"] = _default;