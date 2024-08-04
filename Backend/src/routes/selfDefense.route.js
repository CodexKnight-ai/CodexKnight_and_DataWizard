import { Router } from "express";
import {  addLessons , deleteLessons, getLessons, updateLessons } from "../controllers/selfDefense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router();

router.route('/lessons').get(verifyJWT,getLessons).post(addLessons);
router.route('/lessons/:id').put(updateLessons).delete(deleteLessons);


export default router;