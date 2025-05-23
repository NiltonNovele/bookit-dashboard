// mailtrap/emails.js
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

import { resend, sender } from "./resend.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      tags: [{ name: "category", value: "email_verification" }],
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Welcome to BookIt!",
      html: `<p>Hi ${name},</p><p>Welcome to BookIt!</p>`,
      tags: [{ name: "category", value: "welcome_email" }],
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      tags: [{ name: "category", value: "password_reset" }],
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      tags: [{ name: "category", value: "password_eset" }],
    });

    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
