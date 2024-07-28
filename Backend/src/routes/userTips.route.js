import { Router } from "express";
import { getTips, addTips, deleteTips } from "../controllers/userTips.controller.js";

const router = Router();
router.route('/tips')
    .get(getTips)
    .post(addTips)
router.route('/tips/:id').delete(deleteTips);

export default router;
