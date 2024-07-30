import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addNews,
  getNews,
  getNewsById,
  likeNews,
  unlikeNews,
  addComment,
  editComment,
  deleteComment,
  getComments
} from "../controllers/news.controller.js";

const router = Router();

router.post("/news", upload.single("newsImage"), addNews);
router.get("/news", getNews);
router.get("/news/:id", getNewsById);
router.post("/news/:id/like", likeNews);
router.post("/news/:id/unlike", unlikeNews);
router.post("/news/:id/comments", addComment);
router.put("/news/:newsId/comments/:commentId", editComment);
router.delete("/news/:newsId/comments/:commentId", deleteComment);
router.get("/news/:id/comments", getComments);

export default router;
