const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  const { email, password, subscription = "starter", token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, subscription, token, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = signUp;
