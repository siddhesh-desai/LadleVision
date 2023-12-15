import { pool } from "./database.js";

export async function getLatestLadleInformation(ladleId) {
  const [rows] = await pool.query(`
    SELECT l.id AS ladleId, l.stillGrade, l.makeYear, l.expiry, f.temp, f.loc, f.created
    FROM ladle l
    LEFT JOIN frame f ON l.id = f.ladleno
    WHERE l.id = ?
    ORDER BY f.created DESC
    LIMIT 1
  `, [ladleId]);

  return rows[0];
}

