import { pool } from './database.js';

export async function addMaintenanceRecord(LadleNo, WorkerEmail) {
    try {
        // Update LastCheckDate in the ladle table
        const updateLadleQuery = `
            UPDATE ladle
            SET LastCheckDate = CURRENT_TIMESTAMP
            WHERE LadleNo = ?;
        `;

        await pool.query(updateLadleQuery, [LadleNo]);

        // Add maintenance record to the maintenance table
        const addMaintenanceQuery = `
            INSERT INTO maintenance (LadleNo, WorkerEmail)
            VALUES (?, ?);
        `;

        const result = await pool.query(addMaintenanceQuery, [LadleNo, WorkerEmail]);

        return result;
    } catch (error) {
        console.error("Error adding maintenance record:", error);
        throw error;
    }
}

export async function getAllMaintenanceRecords() {
    try {
        const result = await pool.query('SELECT * FROM maintenance');
        return result[0]; // Assuming result is an array where index 0 contains the rows
    } catch (error) {
        console.error("Error fetching maintenance records:", error);
        throw error;
    }
}
