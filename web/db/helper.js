import { pool } from "./database.js";

// Give the latest information about a ladle
export async function getLatestLadleInformation(LadleNo) {
  const [rows] = await pool.query(`
    SELECT l.LadleNo, l.SteelGrade, l.ManufYear, l.LastCheckDate, f.Temperature, f.Location, f.TimeDetected
    FROM ladle l
    LEFT JOIN frame f ON l.LadleNo = f.LadleNo
    WHERE l.LadleNo = ?
    ORDER BY f.TimeDetected DESC
    LIMIT 1
  `, [LadleNo]);

  return rows[0];
}

// Get the current location of all ladles
export async function getCurrentLocationOfAllLadles() {
  const [rows] = await pool.query(`
    SELECT l.LadleNo, MAX(f.Location) AS Location
FROM ladle l
LEFT JOIN frame f ON l.LadleNo = f.LadleNo
WHERE f.TimeDetected = (
  SELECT MAX(TimeDetected)
  FROM frame
  WHERE LadleNo = l.LadleNo
)
GROUP BY l.LadleNo;
  `);

  return rows;
}