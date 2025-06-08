import express from "express";
import { getProfile, getDelivery, acceptRejectDelivery, updateDeliveryStatus } from "../controllers/generalControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

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
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
router.get("/profile", protect, getProfile);

/**
 * @swagger
 * /driver/deliveries/{id}:
 *   get:
 *     summary: Get a single delivery by ID
 *     tags:
 *       - Driver
 *     description: Returns details of a specific delivery if accessible by the authenticated driver.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the delivery to retrieve
 *     responses:
 *       200:
 *         description: Delivery details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the assigned driver)
 *       404:
 *         delivery: Delivery not found
 */
router.get("/deliveries/:id", protect, getDelivery);

/**
 * @swagger
 * /driver/deliveries/{id}/accept-reject:
 *   patch:
 *     summary: Accept or reject a delivery assignment
 *     tags:
 *       - Driver
 *     description: Allows the assigned driver to accept or reject a delivery.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the delivery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [accept, reject]
 *                 example: accept
 *     responses:
 *       200:
 *         description: Delivery status updated
 *       400:
 *         description: Bad request (invalid action)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the assigned driver)
 *       404:
 *         description: Delivery not found
 */
router.patch("/deliveries/:id/accept-reject", protect, acceptRejectDelivery);

/**
 * @swagger
 * /driver/deliveries/{id}/status:
 *   patch:
 *     summary: Update delivery status
 *     tags:
 *       - Driver
 *     description: Allows the assigned driver to update the delivery status.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the delivery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Picked-Up, En-Route, Delivered, Failed]
 *                 example: Delivered
 *               failureReason:
 *                 type: string
 *                 example: "Wrong address provided"
 *                 description: Required if status is Failed
 *     responses:
 *       200:
 *         description: Delivery status updated
 *       400:
 *         description: Bad request (invalid status or missing failure reason)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the assigned driver)
 *       404:
 *         description: Delivery not found
 */
router.patch("/deliveries/:id/status", protect, updateDeliveryStatus);

export default router;