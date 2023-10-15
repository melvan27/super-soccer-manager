const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user.model");

module.exports.registerUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.SECRET_KEY
      );

      res
        .cookie("usertoken", userToken, {
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    // email not found in users collection
    return res.status(400).json({ errors: {email: {message: "Email is not registered"}} });
  }

  // if we made it this far, we found a user with this email address
  // let's compare the supplied password to the hashed password in the database
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!correctPassword) {
    // password wasn't a match!
    return res.status(400).json({ errors: {password: {message: "Incorrect password"}} });
  }

  // if we made it this far, the password was correct
  const userToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.SECRET_KEY
  );

  // note that the response object allows chained calls to cookie and json
  res
    .cookie("usertoken", userToken, {
      httpOnly: true,
    })
    .json({ msg: "success!" });
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
};

module.exports.getAllUsers = (request, response) => {
  User.find()
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};

module.exports.loginState = (req, res) => {
  res.json({ verified: true });
}

module.exports.getUser = (req, res) => {
  const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY).id;
  User.findOne({_id: userId})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

module.exports.updateUser = (req, res) => {
  const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY).id;
  User.findOneAndUpdate({_id: userId}, req.body, {new: true})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

module.exports.addCoach = (req, res) => {
  const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY).id;
  const { newCoachId } = req.body;
  User.findOneAndUpdate({_id: userId}, {$push: {coaches: newCoachId}}, {new: true})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

module.exports.getNumberOfCoaches = (req, res) => {
  const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY).id;
  User.findOne({_id: userId})
    .then((user) => res.json(user.coaches.length))
    .catch((err) => res.json(err));
}