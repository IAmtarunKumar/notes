const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.get("/check", (req, res) => {
  res.send("chekc");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  //bycypt
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "something went wrong in reg", error: error.message });
      } else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "User is registered" });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong in reg", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const data = await UserModel.find({ email });
  console.log(data)
  if (data.length > 0) {
    bcrypt.compare(pass, data[0].pass, function (err, result) {
      // result == true
      if (result) {
        var token = jwt.sign({ userID: data[0]._id }, "masai");
        console.log(token);
        res.send({ msg: "User is loged In", token: token,"name" : data[0].name ,"userID" : data[0]._id});
      } else {
        res.send({ msg: "something went wrong in reg" });
      }
    });
  } else {
    res.send({ msg: "something went wrong in reg" });
  }
});

module.exports = {
  userRouter,
};
