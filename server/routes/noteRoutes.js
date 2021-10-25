const router = require("express").Router();
const NoteModel = require("../models/NoteModel");
const verify = require("./verifyToken");

//GET ALL NOTES
router.get("/", verify, async (req, res) => {
	try {
		const notes = await NoteModel.find();
		if (notes.length === 0 || !notes) {
			return res
				.status(404)
				.json({ success: false, error: "Notes Not Found!" });
		}
		return res.status(200).json({ success: true, data: notes });
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

//GET SINGLE NOTE
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const note = await NoteModel.findById(id);
		if (!note) {
			return res.status(404).json({ success: false, error: "Note Not Found!" });
		}
		return res.status(200).json({ success: true, data: note });
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

//ADD A NOTE
router.post("/", async (req, res) => {
	const note = {
		markdown: req.body.markdown,
	};
	if (note.markdown === "" || typeof note.markdown !== "string") {
		return res.status(400).json({
			success: false,
			error: "You must provide note object with a string!",
		});
	} else {
		const newNote = new NoteModel(note);
		try {
			await newNote.save();
			return res.status(200).json({
				success: true,
				statusMessage: "New note added succesfully!",
				data: newNote,
			});
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
			return res
				.status(404)
				.json({ success: false, error: "Error: This note does not exist!" });
		}
		return res
			.status(200)
			.json({ success: true, statusMessage: "Note deleted succesfully!" });
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

//UPDATE A NOTE
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const userInput = {
		markdown: req.body.markdown,
	};

	if (userInput.markdown === "" || typeof userInput.markdown !== "string") {
		return res.status(400).json({
			success: false,
			error: "You must provide note object with a string!",
		});
	} else {
		try {
			let note = await NoteModel.findById(id);
			note.markdown = userInput.markdown;
			const updatedNote = await note.save({ new: true });
			if (!updatedNote) {
				return res
					.status(404)
					.json({ success: false, error: "Error: This note does not exist!" });
			}
			return res.status(200).json({
				success: true,
				statusMessage: "Note updated succesfully!",
				data: updatedNote,
			});
		} catch (err) {
			return res.status(400).json({ success: false, error: err });
		}
	}
});

module.exports = router;
