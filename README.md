# 🚚 SmartLogix

**SmartLogix** is a lightweight logistics coordination platform built as a capstone project for the **Tech Crush Internship**. It provides a simple way for administrators to assign deliveries to drivers and enables drivers to update the delivery status — without requiring live GPS or location tracking.

---

## 🔧 Features

### 👤 Admin

- Create new delivery tasks
- Assign drivers to deliveries
- View delivery history and current status

### 🚗 Driver

- View assigned deliveries
- Update delivery statuses (e.g. `On the Way`, `Delivered`)
- View status history of a delivery

---

## 🧱 Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| Backend        | Node.js (ESM), Express.js        |
| Database       | MySQL or PostgreSQL              |
| ORM            | Sequelize                        |
| Authentication | JWT + Role-based Authorization   |
| Environment    | dotenv for environment variables |

---

## 📁 Project Structure

src/
├── config/ # DB config and Sequelize instance
├── controllers/ # Route controllers
├── middlewares/ # Auth and role guards
├── models/ # Sequelize models
├── routes/ # Express routes
├── services/ # Business logic
├── utils/ # Utility functions
└── index.js # App entry point

---

## 🔐 Roles

- **Admin**
  - Can create, assign, and monitor deliveries
- **Driver**
  - Can view and update their assigned deliveries

---



<!-- ## Features

- User Authentication (Register, Login, Logout)
- Role-Based Access Control (RBAC)
- Password Reset Functionality
- Email Notifications
- Profile Management with Avatar Upload
- Input Validation
- Error Handling
- MySQL Database Integration with Sequelize
- JWT-based Authentication
- Secure Password Hashing
- File Upload Support -->

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd <project-directory>
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a MySQL database

4. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

5. Start the server:
   \`\`\`bash

# Development

npm run dev

# Production

npm start
\`\`\`

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password/:token - Reset password
- POST /api/auth/change-password - Change password (protected)

<!-- ### Profile

- GET /api/profile - Get user profile
- PUT /api/profile - Update user profile
- POST /api/profile/avatar - Upload profile avatar -->
