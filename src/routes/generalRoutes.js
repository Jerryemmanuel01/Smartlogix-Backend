import express from "express";
import { getProfile } from "../controllers/generalControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes here
/**
 * @swagger
 * /driver/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Driver
 *     description: Returns the authenticated user's profile details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Profile fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 736c7381-89d0-4d9c-a9c2-32d656d9d8fc
 *                     username:
 *                       type: string
 *                       example: donard stack
 *                     email:
 *                       type: string
 *                       example: 01devj@gmail.com
 *                     role:
 *                       type: string
 *                       example: driver
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     lastLogin:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-05T20:47:15.000Z
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 */
router.get("/profile", protect, getProfile);

export default router;
