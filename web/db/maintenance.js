import { pool } from './database.js';

export async function addMaintenanceRecord(LadleNo, WorkerEmail) {
    try {
        const result = await pool.query(`
            INSERT INTO maintenance (LadleNo, WorkerEmail)
            VALUES (?, ?)
        `, [LadleNo, WorkerEmail]);

        return result;
    } catch (error) {
        console.error("Error adding maintenance record:", error);
        throw error;
    }
}
