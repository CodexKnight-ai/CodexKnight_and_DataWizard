import { Router } from "express";
import {  addLessons , getLessons } from "../controllers/selfDefense.controller.js";

const router=Router();

router.route('/lessons').get(getLessons).post(addLessons);



export default router;