import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createCareer, deleteCareer, getCareer } from "../controllers/career.controller.js";

const router = Router();
router.route('/create-career')
    .post(upload.single('careerImage'), createCareer)
    .get(getCareer)

router.route('/careers/:id')
    .delete(deleteCareer)

export default router;
