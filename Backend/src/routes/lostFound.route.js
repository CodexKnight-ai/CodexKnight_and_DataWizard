import express from "express";
import {
    getLostItems,
    getFoundItems,
    addLostItem,
    addFoundItem,
    deleteLostItem,
    deleteFoundItem,
    moveItemsToFound,
} from "../controllers/lostFound.controller.js"

const router = express.Router();

router.get("/itemslost", getLostItems);
router.get("/itemsfound", getFoundItems);
router.post("/itemslost", addLostItem);
router.post("/itemsfound", addFoundItem);
router.delete("/itemslost/:id", deleteLostItem);
router.delete("/itemsfound/:id", deleteFoundItem);
router.post("/moveitemstofound/:id", moveItemsToFound);

export default router;
