import { UserTip } from "../models/userTips.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all tips
const getTips = asyncHandler(async (req, res) => {
    const tips = await UserTip.find();
    res.json(tips);
});

// Add a new tip
const addTips = asyncHandler(async (req, res) => {
    const tip = new UserTip(req.body);
    try {
        const newTip = await tip.save();
        res.status(201).json(newTip); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a tip by ID
const deleteTips = asyncHandler(async (req, res) => {
    try {
        await UserTip.findByIdAndDelete(req.params.id);
        res.json({ message: "Tip deleted successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { getTips, addTips, deleteTips };
