import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addNews, getNews } from "../controllers/news.controller.js";
const router = Router();
router
  .route("/create-news")
  .post(upload.single("newsImage"), addNews)
  .get(getNews);

export default router;
