const express = require("express");
const router = express.Router();
const {
	getAllAnime,
	getAnimeById,
	createAnime,
	updateAnime,
	deleteAnime,
} = require("../controllers/animeController");

router.get("/", getAllAnime);
router.get("/:id", getAnimeById);
router.post("/", createAnime);
router.put("/:id", updateAnime);
router.delete("/:id", deleteAnime);

module.exports = router;
