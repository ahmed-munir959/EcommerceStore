import express from 'express';
import { toggleWishList, getWishList } from '../controllers/wishListController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /wishlist:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get user's wishlist
 *     access: Private
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Toggle product in wishlist
 *     access: Private
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Toggled successfully
 */
router.route('/').get(getWishList).post(toggleWishList);

export default router;
