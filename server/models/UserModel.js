const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: [true, "A user must have a display name"],
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    fullName: {
      type: String,
      required: [true, "A user must have a full name"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
