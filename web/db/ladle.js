import { pool } from "./database.js";

export async function getAllLadles() {
  const [rows] = await pool.query("SELECT * FROM ladle");
  return rows;
}

export async function getLadle(LadleNo) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM ladle
    WHERE LadleNo = ?
    `,
    [LadleNo]
  );
  return rows[0];
}

export async function createLadle(LadleNo, SteelGrade, ManufYear) {
  const [result] = await pool.query(
    `
    INSERT INTO ladle (LadleNo, SteelGrade, ManufYear)
    VALUES (?, ?, ?)
    `,
    [LadleNo, SteelGrade, ManufYear]
  );

  const ladle = await getLadle(LadleNo);

  return ladle;
}

export async function updateLadle(LadleNo, SteelGrade, ManufYear, LastCheckDate) {
  const [result] = await pool.query(
    `
    UPDATE ladle
    SET SteelGrade = ?, ManufYear = ?, LastCheckDate = ?
    WHERE LadleNo = ?
    `,
    [SteelGrade, ManufYear, LastCheckDate, LadleNo]
  );

  const ladle = await getLadle(LadleNo);

  return ladle;
}

export async function deleteLadle(LadleNo) {
  const [result] = await pool.query(`
    DELETE FROM ladle
    WHERE LadleNo = ?
  `, [LadleNo]);

  return result;
}

export async function getHaltLadle(thresholdSeconds) {
    try {
        const currentTime = new Date();

        const [rows] = await pool.query(
            `
            SELECT LadleNo, LastUpdated
            FROM ladle
            WHERE LastUpdated IS NOT NULL
              AND TIMESTAMPDIFF(SECOND, LastUpdated, ?) > ?
              AND Location NOT IN (1, 9)
            `,
            [currentTime, thresholdSeconds]
        );

        return rows;
    } catch (error) {
        console.error("Error getting halted ladles:", error);
        throw error;
    }
}
