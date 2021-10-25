const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const secretToken = process.env.SECRET_TOKEN;
const salt = parseInt(process.env.SALT);

const generateToken = (userId) => {
	return jwt.sign({ data: userId }, secretToken, { expiresIn: "60m" });
};

//GET ALL USERS
router.get("/", (req, res) => {
	User.find()
		.then((users) => res.status(200).json({ success: true, data: users }))
		.catch((err) => res.status(400).json({ success: false, error: err }));
});

//CREATE USER
router.post("/signup", async (req, res) => {
	const { displayName, email, fullName, password } = req.body;

	const userExists = await User.exists({ email });
	if (userExists)
		return res
			.status(400)
			.json({ success: false, error: "User already exists" });

	bcrypt.hash(password, salt, (error, hash) => {
		if (error) return res.status(500).json(error);
		const newUser = new User({
			displayName,
			email,
			fullName,
			password: hash,
		});
		newUser
			.save()
			.then((user) => {
				res.status(201).json({ token: generateToken(user._id) });
			})
			.catch((err) => {
				res.status(400).json({ success: false, error: err });
			});
	});
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }).exec();
		if (!user) {
			return res
				.status(403)
				.json({ success: false, error: "Wrong email or password" });
		}
		bcrypt.compare(password, user.password, (err, match) => {
			if (err) return res.status(500).json({ success: false, error: err });
			else if (match) {
				const token = generateToken(user._id);
				return res
					.status(200)
					.header("auth-token", token)
					.json({ success: true, token });
			} else
				return res
					.status(403)
					.json({ success: false, error: "Wrong email or password" });
		});
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

//DELETE USER
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findOneAndDelete({ _id: id });
		if (!user) {
			return res
				.status(404)
				.json({ success: false, error: "Error: This user does not exist!" });
		}
		return res
			.status(200)
			.json({ success: true, statusMessage: "User deleted succesfully!" });
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

module.exports = router;