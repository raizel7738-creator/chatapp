import express from 'express';
import {
  accessChat,
  fetchChats,
  createGroupChat,
  searchUsers,
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/users').get(protect, searchUsers);

export default router;
