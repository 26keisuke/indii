"use strict";

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passportGoogleOauth = require("passport-google-oauth20");

var _passportFacebook = require("passport-facebook");

var _passportLocal = require("passport-local");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _crypto = _interopRequireDefault(require("crypto"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _User = _interopRequireDefault(require("./models/User"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _Token = _interopRequireDefault(require("./models/Token"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _draft = _interopRequireDefault(require("./routes/draft"));

var _profile = _interopRequireDefault(require("./routes/profile"));

var _topic = _interopRequireDefault(require("./routes/topic"));

var _post = _interopRequireDefault(require("./routes/post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect(_keys["default"].mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("DB CONNECTED!");
  }
})["catch"](function (err) {
  console.error(err);
});

var app = (0, _express["default"])();
app.use((0, _expressSession["default"])({
  secret: [_keys["default"].COOKIE_KEY],
  resave: true,
  saveUninitialized: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
})); //これは将来的に危険。もしユーザーがめっちゃ写真を載せたらおしまい

app.use(_bodyParser["default"].json({
  limit: '50mb'
}));

_mail["default"].setApiKey(_keys["default"].SENDGRID_API_KEY);

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser(function (id, done) {
  _User["default"].findById(id).then(function (user) {
    done(null, user);
  });
}); // 参考: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb


_passport["default"].use(new _passportLocal.Strategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  _User["default"].findOne({
    email: email,
    facebookId: {
      $exists: false
    },
    googleId: {
      $exists: false
    }
  }).then(function (user) {
    if (user) {
      if (user.facebookId || user.googleId) {
        console.log("User is authenticated by external service.");
        return done(null, false);
      }

      _bcrypt["default"].compare(password, user.password).then(function (res) {
        if (res === false) {
          console.log("Password did not match.");
          return done(null, false);
        } else {
          if (!user.isVerified) {
            console.log("User is not verified yet");
            return done(null, false);
          }

          user.activity.push({
            timeStamp: Date.now(),
            type: "LOG_IN"
          });
          user.save().then(function () {
            return done(null, user);
          });
        }
      });
    } else {
      // signUpとloginをここで分けている。果たしてこれが適切かは疑問
      if (!req.body.username) {
        return done(null, false);
      }

      _bcrypt["default"].genSalt(10).then(function (salt) {
        _bcrypt["default"].hash(password, salt).then(function (hash) {
          var hashedPassword = hash;
          var value = {
            userName: req.body.username,
            email: email,
            password: hashedPassword
          };
          new _User["default"](value).save().then(function (user) {
            var token = new _Token["default"]({
              _userId: user._id,
              token: _crypto["default"].randomBytes(16).toString("hex")
            });
            token.save().then(function () {
              var msg = {
                from: 'info@indii.jp',
                to: user.email,
                subject: '【Indii】Indiiにようこそ！',
                text: "".concat(req.body.username, "\u3055\u3093\u3001Indii\u3078\u3088\u3046\u3053\u305D\uFF01\n\n") + "以下のリンクをクリックして、ご登録いただいたメールアドレスを認証してください。\n\n" + "http://indii.jp/api/confirmation/".concat(token.token) + "\n"
              };

              _mail["default"].send(msg).then(function () {
                console.log("Email has been sent");
                done(null, user);
              });
            });
          });
        });
      });
    }
  })["catch"](function (err) {
    return done(err);
  });
})); // facebookの場合は正式名がない


_passport["default"].use(new _passportFacebook.Strategy({
  clientID: _keys["default"].FACEBOOK_CLIENT_ID,
  clientSecret: _keys["default"].FACEBOOK_CLIENT_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email'],
  proxy: true
}, function (accessToken, refreshToken, profile, done) {
  _User["default"].findOne({
    facebookId: profile.id
  }).then(function (user) {
    if (user) {
      user.activity.push({
        timeStamp: Date.now(),
        type: "LOG_IN"
      });
      user.save().then(function () {
        return done(null, user);
      });
    } else {
      var id = profile.id,
          displayName = profile.displayName,
          familyName = profile.familyName,
          givenName = profile.givenName,
          emails = profile.emails,
          photos = profile.photos;
      var value = {
        facebookId: id,
        userName: displayName,
        name: {
          familyName: familyName,
          givenName: givenName
        },
        email: emails[0].value,
        photo: photos[0].value,
        isVerified: true,
        verifiedDate: Date.now()
      };
      new _User["default"](value).save().then(function (user) {
        done(null, user);
      });
    }
  })["catch"](function (err) {
    return done(err);
  });
})); // googleの場合はusernameがない


_passport["default"].use(new _passportGoogleOauth.Strategy({
  clientID: _keys["default"].GOOGLE_CLIENT_ID,
  clientSecret: _keys["default"].GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
}, function (accessToken, refreshToken, profile, done) {
  _User["default"].findOne({
    googleId: profile.id
  }).then(function (user) {
    if (user) {
      user.activity.push({
        timeStamp: Date.now(),
        type: "LOG_IN"
      });
      user.save().then(function () {
        return done(null, user);
      });
    } else {
      var id = profile.id,
          displayName = profile.displayName,
          name = profile.name,
          emails = profile.emails,
          photos = profile.photos;
      var value = {
        googleId: id || "",
        userName: displayName,
        name: {
          familyName: name.familyName || "",
          givenName: name.givenName || ""
        },
        email: emails[0].value,
        photo: photos[0].value || "",
        isVerified: true,
        verifiedDate: Date.now()
      };
      new _User["default"](value).save().then(function (user) {
        done(null, user);
      });
    }
  })["catch"](function (err) {
    done(err);
  });
}));

app.use("/api", _auth["default"]);
app.use("/api/draft", _draft["default"]);
app.use("/api/profile", _profile["default"]);
app.use("/api/topic", _topic["default"]);
app.use("/api/post", _post["default"]);
app.get("/auth/google", _passport["default"].authenticate("google", {
  scope: ["profile", "email"]
}));
app.get("/auth/google/callback", _passport["default"].authenticate("google", {
  failureRedirect: "/"
}), function (req, res) {
  res.redirect("/");
});
app.get("/auth/facebook", _passport["default"].authenticate("facebook"));
app.get("/auth/facebook/callback", _passport["default"].authenticate("facebook", {
  failureRedirect: "/"
}), function (req, res) {
  res.redirect("/");
});
app.get("/api/feed", function (req, res) {
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
app.get("/api/search/:term", function (req, res) {
  console.log("A TERM \"".concat(req.params.term, "\" HAS BEEN SEARCHED"));
  res.send("");
});
app.post("/api/feedback", function (req, res) {
  console.log("Feedback Received! \n", req.body);
  res.send("");
});

if (process.env.NODE_ENV === "production") {
  app.use(_express["default"]["static"]("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, "client", "build", "index.html"));
  });
}

var PORT = process.env.PORT || 5000;
app.listen(PORT, function (err) {
  if (err) {
    throw new Error(err);
  } else {
    console.log("LISTENING ON PORT ".concat(PORT));
  }
});