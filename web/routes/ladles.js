import express from "express";
import { addLadel, deleteLadleByID, doInspection, fetchAllLadle, fetchCurrentLocationOfAllLadles, fetchLadleByID, fetchLatestInfoOfLadleByID, getLadlesNeedInspection, renderSingleLadlePage, updateLadleByID } from "../controller/ladle.js";

const router = express.Router();


// Route to add a ladle
router.post("/", addLadel);

// Route to get all ladles
router.get("/", fetchAllLadle);

router.get("/inspection", getLadlesNeedInspection)

router.get("/inspect/:id", doInspection)

// Route to get ladle by ID
router.get("/:id", fetchLadleByID);

router .get("/r/:id", renderSingleLadlePage)

// Route to update ladle by ID
router.put("/:id", updateLadleByID);

// Route to delete ladle by ID
router.delete("/:id", deleteLadleByID);

router.get("/latest/location/all", fetchCurrentLocationOfAllLadles)
// Route to get latest information about a ladle by ID
router.get("/latest/:id", fetchLatestInfoOfLadleByID)


export default router;
