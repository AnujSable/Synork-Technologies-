/**
 * SendGrid Email Service Module
 * Handles sending emails from contact forms and notifications
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://sendgrid.com
 * 2. Sign up for a free account
 * 3. Create an API key (Settings → API Keys)
 * 4. Verify your sender email (Settings → Sender Authentication)
 * 5. Update the API key and sender email below
 */

import sgMail from "@sendgrid/mail";

// TODO: Replace with your SendGrid API Key from environment variables
// Get this from: SendGrid Dashboard → Settings → API Keys
// Set via: import.meta.env.VITE_SENDGRID_API_KEY
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY || "";

// TODO: Replace with your verified sender email via environment variables
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL || "";

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Initialize SendGrid (call this once on page load)
 */
export function initializeEmailJS() {
  try {
    console.log("SendGrid initialized successfully");
  } catch (error) {
    console.error("SendGrid initialization error:", error);
  }
}

/**
 * Send contact form email to admin
 * @param {object} contactData - Contact form data
 * @returns {Promise<string>} Response ID
 */
export async function sendContactFormEmail(contactData) {
  try {
    const {
      name = "",
      email = "",
      subject = "",
      service = "",
      details = "",
      phone = "",
      company = "",
    } = contactData;

    // Email to admin
    const adminMsg = {
      to: "synorktechnologies@gmail.com", // Your company email
      from: SENDER_EMAIL,
      subject: subject || `New Contact Inquiry: ${service}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${details}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    const adminResponse = await sgMail.send(adminMsg);

    // Send confirmation email to user
    await sendConfirmationEmail({
      to_email: email,
      to_name: name,
      subject: subject || `We received your inquiry - ${service}`,
    });

    return adminResponse[0].statusCode;
  } catch (error) {
    console.error("Error sending contact form email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
}

/**
 * Send confirmation email to user
 * @param {object} confirmationData - Confirmation email data
 * @returns {Promise<object>} SendGrid response
 */
export async function sendConfirmationEmail(confirmationData) {
  try {
    const { to_email, to_name, subject } = confirmationData;

    const msg = {
      to: to_email,
      from: SENDER_EMAIL,
      subject: subject || "Thank you for contacting Synork",
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${to_name},</p>
        <p>We have received your inquiry and will get back to you soon.</p>
        <p>Best regards,<br>Synork Technologies Team</p>
        <p>Contact us: synorktechnologies@gmail.com</p>
      `,
    };

    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw - confirmation email failure shouldn't block contact form
    return null;
  }
}

/**
 * Send welcome email to new user
 * @param {object} userData - User data
 * @returns {Promise<object>} SendGrid response
 */
export async function sendWelcomeEmail(userData) {
  try {
    const { email, fullName } = userData;

    const msg = {
      to: email,
      from: SENDER_EMAIL,
      subject: "Welcome to Synork!",
      html: `
        <h2>Welcome to Synork Technologies!</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for joining us. We're excited to have you on board!</p>
        <p>Best regards,<br>Synork Technologies Team</p>
      `,
    };

    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return null;
  }
}

/**
 * Send password reset confirmation email
 * @param {object} resetData - Reset email data
 * @returns {Promise<object>} SendGrid response
 */
export async function sendPasswordResetEmail(resetData) {
  try {
    const { email, fullName, resetLink } = resetData;

    const msg = {
      to: email,
      from: SENDER_EMAIL,
      subject: "Reset your Synork password",
      html: `
        <h2>Password Reset</h2>
        <p>Dear ${fullName},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>Synork Technologies Team</p>
      `,
    };

    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send reset email");
  }
}

/**
 * Send bulk email notification (for admins)
 * @param {array} recipients - Array of email addresses
 * @param {object} emailData - Email content
 * @returns {Promise<array>} Array of responses
 */
export async function sendBulkEmails(recipients, emailData) {
  try {
    const promises = recipients.map((email) =>
      sgMail.send({
        to: email,
        from: SENDER_EMAIL,
        subject: emailData.subject || "Notification from Synork",
        html: emailData.html || emailData.message,
      }),
    );

    return await Promise.all(promises);
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    throw new Error("Failed to send emails");
  }
}
