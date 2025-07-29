const mongoose = require("mongoose");
const transporter = require("../config/mail");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: doc.email,
      subject: "📁 File Uploaded to Cloudinary",
      text: `Your file has been uploaded: ${doc.imageUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <h3 style="color: #4CAF50;">File Uploaded Successfully ✅</h3>
          <p>Hello${doc.name ? ` ${doc.name}` : ""},</p>
          <p>Your file has been uploaded. Click below to view it:</p>
          <p>
            <a href="${doc.imageUrl}" target="_blank"
              style="display: inline-block; padding: 8px 16px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 4px;">
              View File
            </a>
          </p>
          <p>Or copy this URL:</p>
          <p style="word-break: break-all;"><a href="${
            doc.imageUrl
          }" target="_blank">${doc.imageUrl}</a></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email send failed:", error);
  }
});

module.exports = mongoose.model("File", fileSchema);
