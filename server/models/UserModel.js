const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		displayName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;