import { LostItem, FoundItem } from "../models/LostFound.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all Lost Items
const getLostItems = asyncHandler(async (req, res) => {
    console.log("Logged in user:",req.user)
    const items = await LostItem.find();
    res.json(items);
});

// Get all Found Items
const getFoundItems = asyncHandler(async (req, res) => {
    const items = await FoundItem.find();
    res.json(items);
});

// Add a new Lost Item
const addLostItem = asyncHandler(async (req, res) => {
    const item = new LostItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add a new Found Item
const addFoundItem = asyncHandler(async (req, res) => {
    const item = new FoundItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Lost Item
const deleteLostItem = asyncHandler(async (req, res) => {
    try {
        const item = await LostItem.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        res.json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Found Item
const deleteFoundItem = asyncHandler(async (req, res) => {
    try {
        const item = await FoundItem.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        res.json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Move item from Lost to Found
const moveItemsToFound = asyncHandler(async (req, res) => {
    try {
        const item = await LostItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const foundItem = new FoundItem({
            userName: item.userName,
            phoneNo: item.phoneNo,
            foundItemName: item.lostItemName,
            foundItemImage: item.lostItemImage,
            foundItemDiscription: item.lostItemDiscription,
            foundItemAddress: item.lostItemAddress,
            foundItemDate: new Date(),
        });

        await foundItem.save();
        await LostItem.findByIdAndDelete(req.params.id);

        res.json({ message: 'Item moved to found and deleted from lost' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { getLostItems, getFoundItems, addLostItem, addFoundItem, deleteLostItem, deleteFoundItem, moveItemsToFound };
