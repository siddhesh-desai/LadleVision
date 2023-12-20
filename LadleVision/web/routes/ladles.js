import express from "express";

import { addLadel, deleteLadleByID, doInspection, fetchAllLadle, fetchCurrentLocationOfAllLadles, fetchLadleByID, fetchLatestInfoOfLadleByID, getLadlesNeedInspection, renderAllLadles, renderSingleLadlePage, sendHaltedLadle, updateLadleByID } from "../controller/ladle.js";
import { renderAllMaintenance } from "../controller/maintainance.js";
import { pool } from "../db/database.js";
import { createObjectCsvWriter } from 'csv-writer';

const router = express.Router();


// Route to add a ladle
router.post("/", addLadel);

// Route to get all ladles
router.get("/", fetchAllLadle);

router.get('/download', async (req, res) => {
    try {
        const query = 'SELECT * FROM frame';
        const [results] = await pool.query(query);

        const csvWriter = createObjectCsvWriter({
            path: 'output.csv',
            header: Object.keys(results[0]).map(column => ({ id: column, title: column })),
        });

        await csvWriter.writeRecords(results);

        console.log('CSV file has been written successfully');
        res.download('output.csv', 'output.csv');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get("/allLadles",renderAllLadles)

router.get("/inspection", getLadlesNeedInspection)

router.get("/gethalted", sendHaltedLadle)

router.get("/inspect/:id", doInspection)

router.get("/maintainance", renderAllMaintenance)

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
