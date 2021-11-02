const router = require("express").Router();
const { verify } = require("../utils/verifyToken");
const {
  addNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");

router.post("/", verify, addNote);

router.get("/", verify, getAllNotes);

router.get("/:id", verify, getSingleNote);

router.put("/:id", verify, updateNote);

router.delete("/:id", verify, deleteNote);

module.exports = router;
