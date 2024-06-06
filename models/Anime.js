const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		episodes: { type: Number, default: 0 },
		genres: [{ type: String }],
		imageUrl: { type: String, required: true },
		releaseDate: { type: Date, required: true },
		rating: { type: Number, default: 0 },
		reviews: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				review: { type: String },
				rating: { type: Number },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Anime", animeSchema);
