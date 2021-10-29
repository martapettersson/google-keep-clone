const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: [true, "A user must have a display name"],
      minlength: [1, "Display name must be at least 1 characters long"],
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      minlength: [3, "Email must be at least 3 characters long"],
    },
    fullName: {
      type: String,
      required: [true, "A user must have a full name"],
      minlength: [1, "Full name must be at least 1 characters long"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
