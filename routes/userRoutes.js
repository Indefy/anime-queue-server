const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getFavorites,
	addFavorite,
	removeFavorite,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Favorites routes
router.get("/favorites", verifyToken, getFavorites);
router.post("/favorites", verifyToken, addFavorite);
router.delete("/favorites/:animeId", verifyToken, removeFavorite);

module.exports = router;
