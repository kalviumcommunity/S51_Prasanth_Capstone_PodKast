const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail', 'yahoo', etc.
  auth: {
    user: "work.prasanthj@gmail.com", // replace with your email
    pass: "Prasanth-21", // replace with your email password
  },
});

const sendResetEmail = async (to, link) => {
  const mailOptions = {
    from: "work.prasanthj@gmail.com",
    to,
    subject: "Password Reset",
    text: `Please use the following link to reset your password: ${link}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendResetEmail,
};
