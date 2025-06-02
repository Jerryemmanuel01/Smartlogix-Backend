import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/authController.js";
import {
  protect,
  authorize,
  validateRequest,
} from "../middleware/authMiddleware.js";
import {
  registerValidation,
  loginValidation,
  passwordValidation,
  changePasswordValidation,
  forgetPasswordValidation,
} from "../validators/authValidators.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: StrongP@ssw0rd
 *                 description: >
 *                   Must be at least 8 characters and contain:
 *                   - one uppercase letter
 *                   - one lowercase letter
 *                   - one number
 *                   - one special character
 *               confirmPassword:
 *                 type: string
 *                 example: StrongP@ssw0rd
 *                 description: Must match the password
 *               role:
 *                 type: string
 *                 enum: [admin, driver]
 *                 example: driver
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerValidation, validateRequest, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: StrongP@ssw0rd
 *                 description: >
 *                   Must be at least 8 characters and contain:
 *                   - one uppercase letter
 *                   - one lowercase letter
 *                   - one number
 *                   - one special character
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidation, validateRequest, login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 */
router.post(
  "/forgot-password",
  forgetPasswordValidation,
  validateRequest,
  forgotPassword
);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post(
  "/reset-password/:token",
  passwordValidation,
  validateRequest,
  resetPassword
);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change password (authenticated)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Current password is incorrect
 */
router.post(
  "/change-password",
  protect,
  changePasswordValidation,
  validateRequest,
  changePassword
);

// --FOR ADMIN ROUTES
// /**
//  * @swagger
//  * /auth/admin-only:
//  *   get:
//  *     summary: Admin only route
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Admin access granted
//  *       403:
//  *         description: Not authorized (non-admin user)
//  */
// router.get("/admin-only", protect, authorize("admin"), (req, res) => {
//   res.json({
//     status: "success",
//     message: "You have admin access",
//     user: req.user,
//   });
// });

export default router;
