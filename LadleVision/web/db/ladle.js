import { pool } from "./database.js";
import moment from 'moment';

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

export async function updateLadle(
  LadleNo,
  SteelGrade,
  ManufYear,
  LastCheckDate
) {
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
  const [result] = await pool.query(
    `
    DELETE FROM ladle
    WHERE LadleNo = ?
  `,
    [LadleNo]
  );

  return result;
}

export async function getHaltLadle(thresholdSeconds) {
  try {
    const currentTime = new Date();

    const [rows] = await pool.query(
<<<<<<< HEAD:LadleVision/web/db/ladle.js
      "SELECT * FROM ladle WHERE Location NOT IN (1, 9)"
=======
      `SELECT * FROM ladle`
>>>>>>> 15a4617cc59fd4847a3bd6f60d61e95b632798a4:web/db/ladle.js
    );
    // Filter rows based on the threshold
    const filteredRows = rows.filter((row) => {
      const lastUpdatedTime = moment(row.LastUpdated);
<<<<<<< HEAD:LadleVision/web/db/ladle.js
//      console.log("lastUpdatedTime:", lastUpdatedTime)
    console.log(row.LastUpdated)
=======
>>>>>>> 15a4617cc59fd4847a3bd6f60d61e95b632798a4:web/db/ladle.js
      const timeDifference = moment
        .duration(currentTime - lastUpdatedTime)
        .asSeconds();
      return timeDifference > thresholdSeconds;
    });
<<<<<<< HEAD:LadleVision/web/db/ladle.js
    console.log("rows:",filteredRows)
=======

>>>>>>> 15a4617cc59fd4847a3bd6f60d61e95b632798a4:web/db/ladle.js
    return filteredRows;
  } catch (error) {
    console.error("Error getting halted ladles:", error);
    throw error;
<<<<<<< HEAD:LadleVision/web/db/ladle.js
=======
  }
>>>>>>> 15a4617cc59fd4847a3bd6f60d61e95b632798a4:web/db/ladle.js
}
}