const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/sessions", (req, res, next) => {
  console.log("inside");
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      console.log("err");
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      console.log("no user");
      res.status(401).json(failureDetails); // `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        console.log("login err");
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (thats why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/users", (req, res, next) => {
  const email = req.body.email; // mail
  const companyName = req.body.companyName;
  const password = req.body.password;
  const clientType = req.body.clientType;
  const address = req.body.address || "";
  const GeoLoc = req.body.GeoLoc || { lat: null, lng: null };
  console.log(req.body);

  if (!companyName || !password || !email || !clientType) {
    res.status(400).json({ message: "Merci de renseigner tous les champs" });
    return;
  }

  User.findOne({ email: email }, (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "L'utilisateur existe déjà" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      companyName,
      password: hashPass,
      clientType,
      address,
      GeoLoc
    });

    newUser
      .save()
      .then(user => {
        req.login(user, err => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          }

          res.status(201).json(user);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.delete("/session", (req, res) => {
  req.logout();
  res.status(204).send();
});

router.get("/user", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: "Unauthorized" });
});

router.put("/users/edit", (req, res, next) => {
  // Check user is logged in
  if (!req.user) {
    res
      .status(401)
      .json({ message: "Connectez-vous pour éditer votre profil" });
    return;
  }

  // Updating `req.user` with each `req.body` field (excluding some internal fields `cannotUpdateFields`)
  Object.keys(req.body)
    .filter(key => key !== "_id")
    .forEach(key => {
      if (key==="password"){
        if(req.body.password === "") {
          req.user.password = req.user.password;
        }
        else {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(req.body.password, salt);
          req.user.password = hashPass;
        }
      } else {
        req.user[key] = req.body[key];
      }
    });

  // Validating user with its new values (see: https://mongoosejs.com/docs/validation.html#async-custom-validators)
  req.user.validate(function(error) {
    if (error) {
      // see: https://mongoosejs.com/docs/validation.html#validation-errors
      res.status(400).json({ message: error.errors });
      return;
    }

    // Validation ok, let save it
    req.user.save(function(err) {
      if (err) {
        res.status(500).json({ message: "Error while saving user into DB." });
        return;
      }

      res.status(200).json(req.user);
    });
  });
});

const uploader = require("../cloudinary.js");
router.post("/users/upload", uploader.single("image"), (req, res, next) => {
  // Check user is logged in
  if (!req.user) {
    res
      .status(401)
      .json({ message: "You need to be logged in to upload your avatar" });
    return;
  }

  // Check a file has been provided
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded!" });
    return;
  }

  // Updating user's `image`
  req.user.imageUrl = req.file.secure_url;
  console.log("hello", req.user.imageUrl);

  // Validating user before saving
  req.user.validate(function(error) {
    if (error) {
      res.status(400).json({ message: error.errors });
      return;
    }

    // Validation ok, let save it
    req.user.save(function(err) {
      if (err) {
        console.log("user edited", req.user);
        res.status(500).json({ message: "Error while saving user into DB." });
        return;
      }

      res.status(200).json(req.user);
    });
  });
});

module.exports = router;
