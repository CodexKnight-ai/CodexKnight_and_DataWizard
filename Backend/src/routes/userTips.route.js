import { Router } from "express";
import { getTips, addTips, deleteTips } from "../controllers/userTips.controller.js";

const router = Router();

// Route for getting all tips and adding a new tip
router.route('/tips')
    .get(getTips)
    .post(addTips);

// Route for deleting a tip by ID
router.route('/tips/:id')
    .delete(deleteTips);

    
export default router;
