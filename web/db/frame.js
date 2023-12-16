import { pool } from "./database.js";

export async function getAllFrames() {
  const [rows] = await pool.query("SELECT * FROM frame");
  return rows;
}

export async function getFrame(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM frame
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function createFrame(ladleno, temp, loc) {
  const [result] = await pool.query(
    `
    INSERT INTO frame (ladleno, temp, loc)
    VALUES (?, ?, ?)
    `,
    [ladleno, temp, loc]
  );

  const frame = await getFrame(result.insertId);

  return frame;
}

export async function updateFrame(id, ladleno, temp, loc) {
  const [result] = await pool.query(
    `
    UPDATE frame
    SET ladleno = ?, temp = ?, loc = ?
    WHERE id = ?
    `,
    [ladleno, temp, loc, id]
  );

  const frame = await getFrame(id);

  return frame;
}

export async function deleteFrame(id) {
  const [result] = await pool.query(`
    DELETE FROM frame
    WHERE id = ?
  `, [id]);

  return result;
}
