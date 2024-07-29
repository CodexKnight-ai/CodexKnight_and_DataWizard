import { Router } from "express";
import { getItems , deleteItems , addItems } from "../controllers/lostFound.controller.js";
const router = Router();

// Route for getting all items and adding items
router.route('/items')
    .get(getItems)
    .post(addItems)
// Route for deleting a items by ID
router.route('/items/:id')
    .delete(deleteItems);

export default router;
    