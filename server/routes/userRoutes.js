const router = require("express").Router();
const verify = require("../utils/verifyToken");
const {
  getUser,
  signUpUser,
  loginUser,
} = require("../controllers/userControllers");

//CREATE USER
router.post("/signup", signUpUser);

//LOGIN USER
router.post("/login", loginUser);

//GET USER
router.get("/getMe", verify, getUser);

module.exports = router;
