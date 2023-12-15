import express from "express";
import { addLadel, deleteLadleByID, fetchAllLadle, fetchLadleByID, fetchLatestInfoOfLadleByID, updateLadleByID } from "../controller/ladle.js";

const router = express.Router();


// Route to add a ladle
router.post("/", addLadel);

// Route to get all ladles
router.get("/", fetchAllLadle);

// Route to get ladle by ID
router.get("/:id", fetchLadleByID);

// Route to update ladle by ID
router.put("/:id", updateLadleByID);

// Route to delete ladle by ID
router.delete("/:id", deleteLadleByID);

// Route to get latest information about a ladle by ID
router.get("/latest/:id", fetchLatestInfoOfLadleByID)

export default router;
