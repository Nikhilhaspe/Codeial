const User = require("../models/user");

module.exports.profile = (req, res) => {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (err) {
        console.log("Unable to find user by using cookies");
        return res.redirect("/users/sign-in");
      }
      if (user) {
        res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        res.redirect("/users/sign-in");
      }
    });
  } else return res.redirect("/users/sign-in");
};

module.exports.signUp = (req, res) => {
  if (req.cookies.user_id) return res.redirect("/users/profile");
  return res.render("user_sign_up", {
    title: "Codeial | SignUP",
  });
};

module.exports.signIn = (req, res) => {
  if (req.cookies.user_id) return res.redirect("/users/profile");
  return res.render("user_sign_in", {
    title: "Codeial | SignIn",
  });
};

// Get Sign Up Data
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Unable to find user");
      return res.redirect("back");
    }

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("Unable to create user");
          return res.redirect("back");
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("/users/sign-in");
    }
  });
};

// Get Sign In Data
module.exports.createSession = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Unable to sign user in");
      return res.redirect("back");
    }

    if (user) {
      if (user.password != req.body.password) {
        console.log("Wrong Password");
        return res.redirect.back("back");
      }

      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      return res.redirect("back");
    }
  });
};

// Sign Out
module.exports.signOut = (req, res) => {
  res.cookie("user_id", "");
  return res.redirect("/users/sign-in");
};
