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
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/itemslost", getLostItems);
router.get("/itemsfound", getFoundItems);
router.post("/itemslost",upload.single('lostItemImage'), addLostItem);
router.post("/itemsfound",upload.single('lostItemImage'), addFoundItem);
router.delete("/itemslost/:id", deleteLostItem);
router.delete("/itemsfound/:id", deleteFoundItem);
router.post("/moveitemstofound/:id", moveItemsToFound);

export default router;
