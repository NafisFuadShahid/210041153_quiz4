//utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', //change to your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `http://localhost:5000/api/users/verify/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email Verification',
    text: `Hello ${user.name},\n\nPlease verify your email by clicking the link below:\n${verificationLink}\n\nThank you!`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = { sendVerificationEmail };
