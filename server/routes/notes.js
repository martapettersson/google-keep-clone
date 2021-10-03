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

module.exports = router;
