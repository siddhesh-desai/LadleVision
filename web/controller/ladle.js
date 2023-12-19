
import moment from 'moment';
import {createLadle, getAllLadles, getLadle, updateLadle, deleteLadle, getHaltLadle } from "../db/ladle.js"

import { getLatestLadleInformation, getCurrentLocationOfAllLadles } from "../db/helper.js"; 
import { addMaintenanceRecord } from '../db/maintainance.js';

export const addLadel = async (req, res) => {
    try {
        const { LadleNo, SteelGrade, ManufYear } = req.body; 
        const result = await createLadle(LadleNo, SteelGrade, ManufYear);
        // return res.status(201).json({ success: true, message: "Ladle added successfully.", data: result });
        return res.status(201).redirect("/ladles/allladles")
    } catch (error) {
        console.error("ERROR /ladles (POST):", error);
        // return res.status(500).json({ success: false, message: "Failed to add ladle.", data: null });
        return res.status(201).redirect("/ladles/allladles")

    }
};


export const fetchAllLadle = async (req, res) => {
    try {
        const ladles = await getAllLadles();
        return res.status(200).json({ success: true, message: "All Ladles fetched successfully.", data: ladles });
    } catch (error) {
        console.error("ERROR /ladles (GET):", error);
        return res.status(500).json({ success: false, message: "Failed to fetch ladles.", data: null });
    }
}

export const fetchLadleByID = async (req, res) => {
    try {
        const ladleId = req.params.id;
        const ladle = await getLadle(ladleId);
        if (!ladle) {
            return res.status(404).json({ success: false, message: "Ladle not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Ladle fetched successfully.", data: ladle });
    } catch (error) {
        console.error("ERROR /ladles/:id (GET):", error);
        return res.status(500).json({ success: false, message: "Failed to fetch ladle.", data: null });
    }
}

export const updateLadleByID = async (req, res) => {
    try {
        const ladleId = req.params.id;
        const { SteelGrade, ManufYear, LastCheckDate } = req.body;
        const result = await updateLadle(ladleId,  SteelGrade, ManufYear, LastCheckDate );
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Ladle not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Ladle updated successfully.", data: result });
    } catch (error) {
        console.error("ERROR /ladles/:id (PUT):", error);
        return res.status(500).json({ success: false, message: "Failed to update ladle.", data: null });
    }
}

export const deleteLadleByID = async (req, res) => {
    try {
        const ladleId = req.params.id;
        const result = await deleteLadle(ladleId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Ladle not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Ladle deleted successfully.", data: null });
    } catch (error) {
        console.error("ERROR /ladles/:id (DELETE):", error);
        return res.status(500).json({ success: false, message: "Failed to delete ladle.", data: null });
    }
}


export const fetchLatestInfoOfLadleByID = async (req, res) => {
    try {
        const ladleId = req.params.id;
        const ladleInfo = await getLatestLadleInformation(ladleId);

        if (!ladleInfo) {
            return res.status(404).json({ success: false, message: "Ladle not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Latest Ladle information fetched successfully.", data: ladleInfo });
    } catch (error) {
        console.error("ERROR /ladles/:id (GET):", error);
        return res.status(500).json({ success: false, message: "Failed to fetch ladle information.", data: null });
    }
};


export const getLadlesNeedInspection = async (req, res) => {
    try {
        // Get all ladles from the database
        const ladles = await getAllLadles();

        // Filter ladles based on the difference between LastCheckDate and the current date
        const filteredLadles = ladles.filter((ladle) => {
            const lastCheckDate = moment(ladle.LastCheckDate);
            const currentDate = moment();

            // Calculate the difference in days
            // const differenceInDays = currentDate.diff(lastCheckDate, 'days');
            const differenceInDays = currentDate.diff(lastCheckDate, 'minutes');

            console.log("Difference: ", differenceInDays);

            // Return ladles with a difference greater than or equal to 1 day
            return differenceInDays >= 1;
        });
        // console.log(filteredLadles)
        return res.status(200).render("alert",{
            success: true,
            message: "Ladles filtered successfully.",
            data: filteredLadles
        });
    } catch (error) {
        console.error("ERROR /ladles/filterByLastCheckDate:", error);
        return res.status(500).render("alert",{
            success: false,
            message: "Failed to filter ladles by LastCheckDate.",
            data: null
        });
    }
};


export const fetchCurrentLocationOfAllLadles = async (req, res) => {
    try {
        // Get the current location of all ladles
        const ladlesLocation = await getCurrentLocationOfAllLadles();

        return res.status(200).json({
            success: true,
            message: "Current location of all ladles fetched successfully.",
            data: ladlesLocation,
        });
    } catch (error) {
        console.error("ERROR /ladles/currentLocation (GET):", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch current location of ladles.",
            data: null,
        });
    }
};

export const renderSingleLadlePage = async (req, res) => {
    try {
        const ladleId = req.params.id;
        const ladleInfo = await getLatestLadleInformation(ladleId);

        if (!ladleInfo) {
            return res.status(404).render("oneLadle",{ success: false, message: "Ladle not found.", data: null });
        }
        // return res.status(200).json({ success: true, message: "Latest Ladle information fetched successfully.", data: ladleInfo });
        return res.status(200).render("oneLadle",{ success: true, message: "Latest Ladle information fetched successfully.", data: ladleInfo });
    } catch (error) {
        console.error("ERROR /ladles/:id (GET):", error);
        return res.status(500).render("oneLadle",{ success: false, message: "Failed to fetch ladle information.", data: null });
    }
}


export const doInspection =  async (req, res) => {
    try {
        // const { LadleNo, WorkerEmail } = req.body;
        const WorkerEmail = req.userEmail || "admin@gmail.com";
        const LadleNo = req.params.id;

        // Call the addMaintenanceRecord function to update LastCheckDate and add a maintenance record
        const result = await addMaintenanceRecord(LadleNo, WorkerEmail);

        // Send a success response
        // res.status(200).json({ message: 'Inspection complete.', result });
        res.redirect("/alert")
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error during inspection:", error);
        // res.status(500).json({ error: 'Internal Server Error' });
        res.redirect("login");
    }
};

export const renderAllLadles = async (req, res) => {
    try {
        // Call the getAllLadles function to retrieve all ladles
        const ladles = await getAllLadles();

        // Send a success response with the ladles
        res.status(200).render("allLadles",{
            success: true,
            message: 'Ladles retrieved successfully.',
            data: ladles
        });
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error getting ladles:", error);
        res.status(500).render("allLadles",{
            success: false,
            message: 'Internal Server Error',
            data: null
        });
    }
}

export const sendHaltedLadle = async (req, res) => {
    try {
        const thresholdSeconds = 5;
        const haltedLadles = await getHaltLadle(thresholdSeconds);

        // Send the halted ladles as a JSON response
        res.status(200).json({
            success: true,
            message: 'Halted ladles retrieved successfully.',
            data: haltedLadles
        });
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error getting halted ladles:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: null
        });
    }
}