import { Router } from "express";
import {  addLessons , deleteLessons, getLessons, updateLessons } from "../controllers/selfDefense.controller.js";

const router=Router();

router.route('/lessons').get(getLessons).post(addLessons);
router.route('/lessons/:id').put(updateLessons).delete(deleteLessons);


export default router;