import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCareer, getCareer } from "../controllers/career.controller.js";

const router = Router();
router.route('/create-career')
    .post(upload.single('careerImage'), createCareer)
    .get(getCareer);

export default router;
