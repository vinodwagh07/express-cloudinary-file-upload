const nodemailer = require("nodemailer");
require('dotenv').config()
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // ✅ not localhost
  port: 587,
  secure: false, // use true for port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


module.exports = transporter;
