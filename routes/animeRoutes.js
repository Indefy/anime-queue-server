const express = require("express");
const router = express.Router();
const {
	getAllAnime,
	getAnimeById,
	createAnime,
	updateAnime,
	deleteAnime,
} = require("../controllers/animeController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllAnime);
router.get("/:id", getAnimeById);
router.post("/", verifyToken, createAnime);
router.put("/:id", verifyToken, updateAnime);
router.delete("/:id", verifyToken, deleteAnime);

module.exports = router;
