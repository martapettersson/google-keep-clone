const router = require("express").Router();

router.post("/login", (req, res) => {
	res.json("login");
});

module.exports = router;
