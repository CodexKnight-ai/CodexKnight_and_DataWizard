import express from "express";
import {sendSMS} from "../controllers/emergencysms.controller.js"


const router = express.Router();

router.post("/sendEmergencySms",sendSMS);


export default router;
