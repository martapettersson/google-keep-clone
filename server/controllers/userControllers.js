const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const { validatePassword } = require("../utils/validation");
const User = require("../models/UserModel");

const salt = parseInt(process.env.SALT, 10);

exports.getUser = (req, res) => {
  User.findOne({ _id: req.user.id })
    .then((user) => res.status(200).json({ success: true, data: user }))
    .catch((err) => res.status(400).json({ success: false, error: err }));
};

exports.signUpUser = async (req, res) => {
  const { displayName, email, fullName, password, passwordConfirm } = req.body;

  const { passwordError } = validatePassword(password, passwordConfirm);
  if (passwordError)
    return res.status(400).json({ success: false, passwordError });

  const userExists = await User.exists({ email });
  if (userExists)
    return res
      .status(400)
      .json({ success: false, error: "User already exists" });

  bcrypt.hash(password, salt, (error, hash) => {
    if (error) return res.status(500).json(error);
    const newUser = new User({
      displayName,
      email,
      fullName,
      password: hash,
    });
    newUser
      .save()
      .then((user) => {
        const token = generateToken(user._id);
        user.password = undefined;
        res.status(201).json({ success: true, token, user });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err });
      });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res
        .status(403)
        .json({ success: false, error: "Wrong email or password" });
    }
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ success: false, error: err });
      if (match) {
        const token = generateToken(user._id);
        user.password = undefined;
        return res.status(200).json({ success: true, token, user });
      }
      return res
        .status(403)
        .json({ success: false, error: "Wrong email or password" });
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};
