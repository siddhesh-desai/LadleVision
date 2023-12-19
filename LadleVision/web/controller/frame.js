import { createFrame, getAllFrames, getFrame, updateFrame, deleteFrame } from "../db/frame.js";

export const addFrame = async (req, res) => {
    try {
        const { LadleNo, Temperature, Location } = req.body;
        const result = await createFrame(LadleNo, Temperature, Location);
        return res.status(201).json({ success: true, message: "Frame added successfully.", data: result });
    } catch (error) {
        console.error("ERROR /frames (POST):", error);
        return res.status(500).json({ success: false, message: "Failed to add frame.", data: null });
    }
};

export const fetchAllFrames = async (req, res) => {
    try {
        const frames = await getAllFrames();
        return res.status(200).json({ success: true, message: "All Frames fetched successfully.", data: frames });
    } catch (error) {
        console.error("ERROR /frames (GET):", error);
        return res.status(500).json({ success: false, message: "Failed to fetch frames.", data: null });
    }
};

export const fetchFrameByID = async (req, res) => {
    try {
        const frameId = req.params.id;
        const frame = await getFrame(frameId);
        if (!frame) {
            return res.status(404).json({ success: false, message: "Frame not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Frame fetched successfully.", data: frame });
    } catch (error) {
        console.error("ERROR /frames/:id (GET):", error);
        return res.status(500).json({ success: false, message: "Failed to fetch frame.", data: null });
    }
};

export const updateFrameByID = async (req, res) => {
    try {
        const frameId = req.params.id;
        const { LadleNo, Temperature, Location } = req.body;
        const result = await updateFrame(frameId, LadleNo, Temperature, Location);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Frame not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Frame updated successfully.", data: result });
    } catch (error) {
        console.error("ERROR /frames/:id (PUT):", error);
        return res.status(500).json({ success: false, message: "Failed to update frame.", data: null });
    }
};

export const deleteFrameByID = async (req, res) => {
    try {
        const frameId = req.params.id;
        const result = await deleteFrame(frameId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Frame not found.", data: null });
        }
        return res.status(200).json({ success: true, message: "Frame deleted successfully.", data: null });
    } catch (error) {
        console.error("ERROR /frames/:id (DELETE):", error);
        return res.status(500).json({ success: false, message: "Failed to delete frame.", data: null });
    }
};
