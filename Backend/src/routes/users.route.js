import { Router } from "express";
import {  SignupUser,loginUser, logoutUser } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router();
router.route('/signup').post(SignupUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

export default router;