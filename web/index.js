import express from "express";
import dotenv from "dotenv";
import ladleRouter from "./routes/ladles.js"
import frameRouter from "./routes/frame.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Ladels route
app.use("/api/ladles", ladleRouter);

// Frame route
app.use("/api/frames", frameRouter);


app.listen(port, console.log(`Listening on port ${port}`));
