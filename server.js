const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const winston = require("winston");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Create a logger
const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" }),
	],
});

// Connect to MongoDB
mongoose
	.connect(process.env.DB_URI)
	.then(() => logger.info("MongoDB connected..."))
	.catch((err) => logger.error(err));

// Create Express app
const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json
app.use(cors()); // enables CORS
app.use(
	morgan("combined", {
		stream: { write: (message) => logger.info(message.trim()) },
	})
); // log HTTP requests

// Define routes
app.get("/", (req, res) => {
	res.send("Welcome to the Anime/Manga Tracker API!");
});

// Import route modules
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const animeRoutes = require("./routes/animeRoutes");
app.use("/anime", animeRoutes);

// Error handling middleware for catching 404 and forwarding to error handler
app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

// General error handling middleware
app.use((err, req, res, next) => {
	logger.error(err.message);
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app; // for testing
