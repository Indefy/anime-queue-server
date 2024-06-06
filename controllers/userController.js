const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
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

// Login a user
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

// Get user favorites
exports.getFavorites = async (req, res) => {
	try {
		const user = await User.findById(req.userId).populate("favorites");
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Add anime to favorites
exports.addFavorite = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ message: "User not found" });
		user.favorites.push(req.params.animeId);
		await user.save();
		res.status(200).json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Remove anime from favorites
exports.removeFavorite = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ message: "User not found" });
		user.favorites.pull(req.params.animeId);
		await user.save();
		res.status(200).json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
