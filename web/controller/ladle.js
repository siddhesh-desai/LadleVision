
import {createLadle, getAllLadles, getLadle, updateLadle, deleteLadle } from "../db/ladle.js"
import { getLatestLadleInformation } from "../db/helper.js"; 

export const addLadel = async (req, res) => {
    try {
        const { stillGrade, makeYear, expiry } = req.body;
        const result = await createLadle(stillGrade, makeYear, expiry);
        return res.status(201).json({ success: true, message: "Ladle added successfully.", data: result });
    } catch (error) {
        console.error("ERROR /ladles (POST):", error);
        return res.status(500).json({ success: false, message: "Failed to add ladle.", data: null });
    }
}


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
        const { stillGrade, makeYear, expiry } = req.body;
        const result = await updateLadle(ladleId, stillGrade, makeYear, expiry);
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
