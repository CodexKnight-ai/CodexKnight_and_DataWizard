import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCareer } from "../controllers/careers.controller.js";

const router = Router();
router.route('/create-career').post(upload.single('careerImage'), createCareer);

export default router;
