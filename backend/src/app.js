import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoute from "./routes/contactRoute.js";

dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
    cors({
        origin: CLIENT_URL,
        methods: ["GET", "POST", "OPTIONS"],
    }),
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio Backend Running 🚀");
});

app.use("/api", contactRoute);

export default app;
