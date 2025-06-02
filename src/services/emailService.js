import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (email, token) => {
  const resetURL = `${
    process.env.FRONTEND_URL || "http://localhost:3000"
  }/reset-password/${token}`;

  const message = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <h1>You have requested a password reset</h1>
      <p>Please click on the following link to reset your password:</p>  
      <div style="margin: 30px 0;">
        <a href="${resetURL}" style="display: inline-block; padding: 12px 20px; background-color: #2563EB; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </div>      
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p>This link will expire in 10 minutes.</p>
    `,
  };

  await transporter.sendMail(message);
};
