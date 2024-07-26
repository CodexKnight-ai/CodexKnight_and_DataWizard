import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import {
  createCriminal,
  getCriminals,
  updateCriminal,
  deleteCriminal,
  updateCriminalAvatar,
} from '../controllers/mostWanted.controller.js';

const router = express.Router();

router.route('/most-wanted-criminal')
  .post(upload.single('avatar'), createCriminal)
  .get(getCriminals);

router.route('/most-wanted-criminal/:id')
  .put(updateCriminal)
  .put(upload.single('avatar'), updateCriminalAvatar)
  .delete(deleteCriminal);

export default router;
