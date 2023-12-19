import { pool } from "./database.js";

export async function getAllFrames() {
  const [rows] = await pool.query("SELECT * FROM frame");
  return rows;
}

export async function getFrame(FrameId) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM frame
    WHERE FrameId = ?
    `,
    [FrameId]
  );
  return rows[0];
}

export async function createFrame(LadleNo, Temperature, Location) {
  const [result] = await pool.query(
    `
    INSERT INTO frame (LadleNo, Temperature, Location)
    VALUES (?, ?, ?)
    `,
    [LadleNo, Temperature, Location]
  );

  const frame = await getFrame(result.insertId);

  return frame;
}

export async function updateFrame(FrameId, LadleNo, Temperature, Location) {
  const [result] = await pool.query(
    `
    UPDATE frame
    SET LadleNo = ?, Temperature = ?, Location = ?
    WHERE FrameId = ?
    `,
    [LadleNo, Temperature, Location, FrameId]
  );

  const frame = await getFrame(FrameId);

  return frame;
}

export async function deleteFrame(FrameId) {
  const [result] = await pool.query(`
    DELETE FROM frame
    WHERE FrameId = ?
  `, [FrameId]);

  return result;
}
