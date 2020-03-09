"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = isLoggedIn;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  console.log("NOT AUTHENTICATED");
  return res.redirect("/");
}