import express from "express";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { createDelivery, getOrders, getDriverById, getDrivers, deleteDriver } from "../controllers/adminController.js";

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

/**
 * @swagger
 * /admin/driver:
 *    get:
 *      summary: Retrieve all drivers
 *      tags: [Admin]
 *      description: |
 *          Returns a list of all drivers in the system.
 *      security:
 *         - bearerAuth: []
 *     responses:
 *       200:
 *   description: List of drivers
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/User'
 *      401:
 *       description: Unauthorized (No or invalid token)
 *      403:
 *      description: Forbidden (Insufficient role)
 */
router.get("/driver", protect, authorize("admin"), getDrivers);

/**
 * @swagger
 * admin/driver/{id}:
 *   get:
 *    summary: Retrieve a driver by ID
 *     tags: [Admin]
 *     description: |
 *      Returns the details of a specific driver by their ID.
 *      security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *    description: The ID of the driver to retrieve
 *     responses:
 *       200:
 *         description: Driver details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     401:
 *       description: Unauthorized (No or invalid token)
 *       403:
 *         description: Forbidden (Insufficient role)
 *   @route GET /admin/driver/:id
 *   @access Private (Admin only)
 *   @description This endpoint retrieves a specific driver's details by their ID.
 *   @param {string} id - The ID of the driver to retrieve.
 *   @returns {object} - The driver's details, excluding sensitive information like password.
 *   @throws {401} - Unauthorized if the user is not authenticated or the token is invalid.
 *   @throws {403} - Forbidden if the user does not have admin privileges.
 *   @throws {404} - Not Found if the driver with the specified ID does not exist.
 */

router.get("/driver/:id", protect, authorize("admin"), getDriverById);
/**
 * @swagger
 * /admin/driver/{id}:
 *   delete:
 *     summary: Delete a driver by ID
 *     tags: [Admin]
 *     description: |
 *       Deletes a specific driver by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the driver to delete
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *       401:
 *         description: Unauthorized (No or invalid token)
 *       403:
 *         description: Forbidden (Insufficient role)
 */
router.delete("/driver/:id", protect, authorize("admin"), deleteDriver);

export default router;
