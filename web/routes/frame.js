import express from "express";
import { addFrame, deleteFrameByID, fetchAllFrames, fetchFrameByID, updateFrameByID } from "../controller/frame.js";

const router = express.Router();

// Route to add a frame
router.post("/", addFrame);

// Route to get all frames
router.get("/", fetchAllFrames);

// Route to get frame by ID
router.get("/:id", fetchFrameByID);

// Route to update frame by ID
router.put("/:id", updateFrameByID);

// Route to delete frame by ID
router.delete("/:id", deleteFrameByID);

export default router;
