import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// email setup nodemailer
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify if the transporter works without errors
transporter.verify((error, success) => {
  if (error) {
    console.log({ error });
  } else {
    console.log(success);
  }
});


export const emailSender = async (options) => {
  try {
    return await transporter.sendMail({
    from:  `Print Management <${process.env.EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html : options.html
  });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};