const router = require("express").Router();
const { verify } = require("../utils/verifyToken");
const {
  addNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");

//CREATE A NOTE
router.post("/", verify, addNote);

//READ ALL NOTES
router.get("/", verify, getAllNotes);

//READ SINGLE NOTE
router.get("/:id", verify, getSingleNote);

//UPDATE A NOTE
router.put("/:id", verify, updateNote);

//DELETE A NOTE
router.delete("/:id", verify, deleteNote);

module.exports = router;
