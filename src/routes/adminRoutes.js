import express from "express"
import { authorize, protect } from "../middleware/authMiddleware.js";
import { createDelivery } from "../controllers/adminController.js";

const router = express.Router();

/**
 * @swagger
 * /admin/create-delivery:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverName
 *               - address
 *               - phone
 *               - description
 *               - driverId
 *             properties:
 *               receiverName:
 *                 type: string
 *                 example: "John Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               phone:
 *                 type: string
 *                 example: "+2348012345678"
 *               description:
 *                 type: string
 *                 example: "Package contains electronics"
 *               driverId:
 *                 type: string
 *                 example: "a1b2c3d4e5"
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *       400:
 *         description: Bad request (missing/invalid fields)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (not an admin)
 */

router.post("/create-delivery", protect, authorize("admin"), createDelivery);

export default router