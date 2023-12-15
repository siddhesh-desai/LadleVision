import { pool } from "./database.js";

export async function getAllLadles() {
  const [rows] = await pool.query("select * from ladle");
  return rows;
}

export async function getLadle(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM ladle
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}
//   const note = await getNote(1)
//   console.log(note)

export async function createLadle(stillGrade, makeYear, expiry) {
  const [result] = await pool.query(
    `
    INSERT INTO ladle (stillGrade, makeYear, expiry)
    VALUES (?, ?, ?)
    `,
    [stillGrade, makeYear, expiry]
  );

  const ladle = getLadle(result.insertId)

  return ladle;
}

export async function updateLadle(id, stillGrade, makeYear, expiry) {
  const [result] = await pool.query(
    `
    UPDATE ladle
    SET stillGrade = ?, makeYear = ?, expiry = ?
    WHERE id = ?
    `,
    [stillGrade, makeYear, expiry, id]
  );

  const ladle = getLadle(id)

  return ladle;
}

export async function deleteLadle(id) {
    const [result] = await pool.query(`
    DELETE FROM ladle
    WHERE id = ?
    `, [id]);

    return result;
}
// const test = async () => {
//   try {
//     const ladles = await getAllLadles();
//     console.log(ladles);
//   } catch (error) {
//     console.error(error);
//   }
// };

// test();
