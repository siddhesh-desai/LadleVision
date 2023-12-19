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

export async function createLadle(SteelGrade, ManufYear) {
  const [result] = await pool.query(
    `
    INSERT INTO ladle (SteelGrade, ManufYear)
    VALUES (?, ?)
    `,
    [SteelGrade, ManufYear]
  );

  const ladle = await getLadle(result.insertId);

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
