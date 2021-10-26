const router = require("express").Router();
const NoteModel = require("../models/NoteModel");
const verify = require("./verifyToken");

//GET ALL NOTES
router.get("/", verify, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.user.id });
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
router.get("/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteModel.findOne({
      $and: [{ _id: id }, { userId: req.user.id }],
    });
    if (!note) {
      return res.status(404).json({ success: false, error: "Note Not Found!" });
    }
    return res.status(200).json({ success: true, data: note });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

//ADD A NOTE
router.post("/", verify, async (req, res) => {
  const note = {
    userId: req.user.id,
    markdown: req.body.markdown,
  };
  if (note.markdown === "" || typeof note.markdown !== "string") {
    return res.status(400).json({
      success: false,
      error: "You must provide note object with a string!",
    });
  }
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
});

//DELETE A NOTE
router.delete("/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteModel.findOneAndDelete({
      $and: [{ _id: id }, { userId: req.user.id }],
    });
    if (!note) {
      return res.status(404).json({ success: false, error: "Note Not Found!" });
    }
    return res
      .status(200)
      .json({ success: true, statusMessage: "Note deleted succesfully!" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

//UPDATE A NOTE
router.put("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const userInput = {
    markdown: req.body.markdown,
  };

  if (userInput.markdown === "" || typeof userInput.markdown !== "string") {
    return res.status(400).json({
      success: false,
      error: "You must provide note object with a markdown string!",
    });
  }
  try {
    const note = await NoteModel.findOne({
      $and: [{ _id: id }, { userId: req.user.id }],
    });
    note.markdown = userInput.markdown;
    const updatedNote = await note.save({ new: true });
    if (!updatedNote) {
      return res.status(404).json({ success: false, error: "Note Not Found!" });
    }
    return res.status(200).json({
      success: true,
      statusMessage: "Note updated succesfully!",
      data: updatedNote,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

module.exports = router;
