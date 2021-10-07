const mongoose = require("mongoose");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const NoteSchema = new mongoose.Schema(
	{
		markdown: { type: String, required: true },
		sanitizedHtml: { type: String, required: true },
	},
	{ timestamps: true }
);

NoteSchema.pre("validate", function (next) {
	if (this.markdown) {
		this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
	}
	next();
});

module.exports = mongoose.model("Note", NoteSchema);
