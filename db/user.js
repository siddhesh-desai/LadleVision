import { pool } from "./database.js"; // Replace with the actual path to your database connection file

export async function createUser(email, password, name, type = 1) {
    const [result] = await pool.query(`
        INSERT INTO user (email, password, type, name)
        VALUES (?, ?, ?, ?)
    `, [email, password, type, name]);

    const newUser = await getUserByEmail(email);

    return newUser;
}

export async function getUserByEmail(email) {
    const [rows] = await pool.query(`
        SELECT * FROM user
        WHERE email = ?
    `, [email]);

    return rows[0];
}

// export async function getAllFrames() {
//     const [rows] = await pool.query("SELECT * FROM frame");
//     return rows;
//   }
  
export async function getAllUsers(){
    const [rows] = await pool.query("SELECT * FROM frame");
    return rows;
}