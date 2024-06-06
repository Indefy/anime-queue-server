const Anime = require("../models/Anime");

// Get all anime
exports.getAllAnime = async (req, res) => {
	try {
		const anime = await Anime.find();
		res.status(200).json(anime);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a single anime
exports.getAnimeById = async (req, res) => {
	try {
		const anime = await Anime.findById(req.params.id);
		if (!anime) return res.status(404).json({ message: "Anime not found" });
		res.status(200).json(anime);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Create a new anime
exports.createAnime = async (req, res) => {
	try {
		const anime = new Anime(req.body);
		await anime.save();
		res.status(201).json(anime);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Update an anime
exports.updateAnime = async (req, res) => {
	try {
		const anime = await Anime.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!anime) return res.status(404).json({ message: "Anime not found" });
		res.status(200).json(anime);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Delete an anime
exports.deleteAnime = async (req, res) => {
	try {
		const anime = await Anime.findByIdAndDelete(req.params.id);
		if (!anime) return res.status(404).json({ message: "Anime not found" });
		res.status(200).json({ message: "Anime deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
