const router = require("express").Router();
const { verify } = require("../utils/verifyToken");
const {
  getUser,
  signUpUser,
  loginUser,
} = require("../controllers/userControllers");

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.get("/getMe", verify, getUser);

module.exports = router;
