const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = new User({ username, email, password });
		await user.save();
		res.status(201).json({ username: user.username, email: user.email });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.getFavorites = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).populate("favorites");
		res.json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addFavorite = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		user.favorites.push(req.body.animeId);
		await user.save();
		res.status(201).json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.removeFavorite = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		user.favorites.pull(req.params.animeId);
		await user.save();
		res.status(200).json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
