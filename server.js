const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const winston = require("winston");
const morgan = require("morgan");

dotenv.config();

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" }),
	],
});

mongoose
	.connect(process.env.DB_URI)
	.then(() => logger.info("MongoDB connected..."))
	.catch((err) => logger.error(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(
	morgan("combined", {
		stream: { write: (message) => logger.info(message.trim()) },
	})
);

const userRoutes = require("./routes/userRoutes");
const animeRoutes = require("./routes/animeRoutes");

app.use("/users", userRoutes);
app.use("/anime", animeRoutes);

app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

app.use((err, req, res, next) => {
	logger.error(err.message);
	res.status(res.statusCode || 500).json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app;
