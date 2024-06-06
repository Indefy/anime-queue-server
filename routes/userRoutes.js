const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getFavorites,
	addFavorite,
	removeFavorite,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Favorite routes (secured with authMiddleware)
router.get("/favorites", authMiddleware, getFavorites);
router.post("/favorites/:animeId", authMiddleware, addFavorite);
router.delete("/favorites/:animeId", authMiddleware, removeFavorite);

module.exports = router;
