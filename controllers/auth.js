const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");

const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

module.exports.register = async function (req, res) {
  const person = await User.findOne({ email: req.body.email });
  if (person) {
    res.status(409).json({
      message: "Email has already existed!",
    });
  } else {
    // ADDED SALT FOR PASSWORD
    const salt = bcrypt.genSaltSync(10);

    const user = new User({
      email: req.body.email,
          //   Hashing Password with BCRYPT!!!
      password: bcrypt.hashSync(req.body.password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }

  }
};

module.exports.login = async function (req, res) {
  const person = await User.findOne({ email: req.body.email });
  if (person) {
    // CHECKOUT PASSWORD
      const password = bcrypt.compareSync(req.body.password, person.password);
      if (password) {
        // GENERATION TOKEN
        let token = jwt.sign({
          email: person.email,
          id: person._id
        }, keys.sekret, {expiresIn: 60 * 60}) // 60 sec * 60 min === 1 hour

          res.status(200).json({
              message: "Welcome!!!",
              token: `Bearer ${token}`
          });
      } else {
          res.status(401).json({
              message: "Password does not compare! Let`s try again!"
          });
      }
  } else {
      res.status(404).json({
          message: "Email does not exists! You have to sign up!!!",
      });
  }
};
