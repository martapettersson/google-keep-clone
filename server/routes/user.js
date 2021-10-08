const router = require("express").Router();
const bcrypt = require("bcrypt");

const users = [];

router.get("/", (req, res) => {
	res.json(users);
});

router.post("/", async (req, res) => {
	const password = req.body.password;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = { name: req.body.name, password: hashedPassword };
		users.push(user);
		res.json(users);
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

router.post("/login", async (req, res) => {
	const user = users.find((user) => user.name === req.body.name);
	if (!user) {
		return res.status(400).json({ success: false, error: "Cannot find user" });
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.send("Success");
		} else {
			res.send("Not allowed");
		}
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

module.exports = router;
