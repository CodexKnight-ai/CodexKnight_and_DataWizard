import { Router } from "express";
import {  SignupUser,loginUser } from "../controllers/users.controller.js";


const router=Router();
router.route('/signup').post(SignupUser);
router.route('/login').post(loginUser);

export default router;