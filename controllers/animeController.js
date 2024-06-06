const Anime = require("../models/Anime");

exports.getAllAnime = async (req, res) => {
	try {
		const anime = await Anime.find();
		res.json(anime);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAnimeById = async (req, res) => {
	try {
		const anime = await Anime.findById(req.params.id);
		if (!anime) {
			return res.status(404).json({ message: "Cannot find anime" });
		}
		res.json(anime);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createAnime = async (req, res) => {
	const anime = new Anime(req.body);
	try {
		const newAnime = await anime.save();
		res.status(201).json(newAnime);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateAnime = async (req, res) => {
	try {
		const updatedAnime = await Anime.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!updatedAnime) {
			return res.status(404).json({ message: "Cannot find anime" });
		}
		res.json(updatedAnime);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteAnime = async (req, res) => {
	try {
		const anime = await Anime.findById(req.params.id);
		if (!anime) {
			return res.status(404).json({ message: "Cannot find anime" });
		}
		await anime.remove();
		res.json({ message: "Deleted anime" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
