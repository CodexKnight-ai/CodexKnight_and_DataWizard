import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCareer, deleteCareer, getCareer } from "../controllers/career.controller.js";

const router = Router();
router.route('/create-career')
    .post(upload.single('careerImage'), createCareer)
    .get(getCareer)
    .delete(deleteCareer)

export default router;
