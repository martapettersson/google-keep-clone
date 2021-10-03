const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
