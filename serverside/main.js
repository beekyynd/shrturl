import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import path from "path";

import { connectDB } from "./config/db.js";

import linkRoutes from "./routes/link.route.js"

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use(cors());

const PORT = process.env.PORT || 5000; // 5000 in case it was not added in env file

const __dirname = path.resolve();

app.use("/api/links", linkRoutes);

if (process.env.NODE_ENV === "production") {

	app.use(express.static(path.join(__dirname, "/clientside/dist")));

	app.get("*", (req, res) => {

		res.sendFile(path.resolve(__dirname, "clientside", "dist", "index.html"));

	});
}

app.listen(PORT, () => {

    connectDB();

    console.log("Server started at http://localhost:" + PORT);

});