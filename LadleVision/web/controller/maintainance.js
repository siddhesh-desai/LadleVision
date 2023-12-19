import { getAllMaintenanceRecords } from "../db/maintainance.js";

export const renderAllMaintenance = async (req, res) => {
    try {
        // Call the getAllMaintenanceRecords function to retrieve all records
        const maintenanceRecords = await getAllMaintenanceRecords();

        // Send a success response with the maintenance records
        res.status(200).render("maintainance",{
            success: true,
            message: 'Maintenance records retrieved successfully.',
            data: maintenanceRecords
        });
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error getting maintenance records:", error);
        res.status(500).render("maintainance",{
            success: false,
            message: 'Internal Server Error',
            data: null
        });
    }
}