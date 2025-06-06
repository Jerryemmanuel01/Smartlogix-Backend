import express from "express";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { createDelivery, getOrders } from "../controllers/adminController.js";

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

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Retrieve orders
 *     tags: [Admin]
 *     description: |
 *       Returns all orders if no status is specified.
 *       If a status query parameter is passed, it returns orders filtered by that status.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, picked-up, en-Route, delivered, failed]
 *         description: Filter orders by status
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized (No or invalid token)
 *       403:
 *         description: Forbidden (Insufficient role)
 */
router.get("/orders", protect, authorize("admin"), getOrders);

export default router;
