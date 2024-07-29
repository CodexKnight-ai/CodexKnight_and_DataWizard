import { LostItem } from "../models/LostFound.model.js";
import asyncHandler from "../utils/asyncHandler.js";
//Get all Items
const getItems = asyncHandler(async (req, res) => {
    const items = await LostItem.find();
    res.json(items);
});

// Add a new Item
const addItems = asyncHandler(async (req, res) => {
    const item = new LostItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete Items
const deleteItems = asyncHandler(async (req, res) => {
    try {
        await LostItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { getItems , deleteItems , addItems }