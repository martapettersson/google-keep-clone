const router = require("express").Router();
const NoteModel = require("../models/NoteModel");

//GET ALL NOTES
router.get("/", async (req, res) => {
	try {
		const notes = await NoteModel.find();
		if (notes.length === 0 || !notes) {
			return res.status(404).json("Error: Notes not found!");
		}
		return res.status(200).json(notes);
	} catch (err) {
		return res.status(400).json({ error: err });
	}
});

//GET SINGLE NOTE
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const note = await NoteModel.findById(id);
		if (!note) {
			return res.status(404).json("Error: Note not found!");
		}
		return res.status(200).json(note);
	} catch (err) {
		return res.status(400).json({ error: err });
	}
});

//ADD A NOTE
router.post("/", async (req, res) => {
	const note = {
		title: req.body.title,
		body: req.body.body,
	};
	if (
		note.title === "" ||
		note.body === "" ||
		typeof note.title !== "string" ||
		typeof note.body !== "string"
	) {
		return res
			.status(400)
			.json(
				"Error: You must provide note object with a title and a body in string format!"
			);
	} else {
		const newNote = new NoteModel(note);
		try {
			await newNote.save();
			return res.status(200).json("New note added succesfully!");
		} catch (err) {
			return res.status(400).json({ error: err });
		}
	}
});

//DELETE A NOTE
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const note = await NoteModel.findOneAndDelete({ _id: id });
		if (!note) {
			return res.status(404).json("Error: This note does not exist!");
		}
		return res.status(200).json("Note deleted succesfully!");
	} catch (err) {
		return res.status(400).json({ error: err });
	}
});

module.exports = router;
