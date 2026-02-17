import express from 'express';
import { addProduct } from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply protect and admin check to all routes in this file
router.use(protect);
router.use(authorizeRoles('admin'));

router.post('/product/new', addProduct);

export default router;
