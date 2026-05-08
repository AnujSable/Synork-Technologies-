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

/**
 * Browser-safe email helper module.
 *
 * This module is intentionally implemented as a no-op in client-side code,
 * because SendGrid requires server-side credential handling.
 */

export function initializeEmailJS() {
  if (typeof window !== "undefined") {
    console.log(
      "Email helper initialized in browser (no-op). Email sending must be handled server-side.",
    );
  }
}

export async function sendContactFormEmail(contactData) {
  console.warn(
    "sendContactFormEmail() is a browser stub. Configure a server endpoint to send emails from the backend.",
    contactData,
  );
  return null;
}

export async function sendConfirmationEmail(confirmationData) {
  console.warn(
    "sendConfirmationEmail() is a browser stub. Configure a server endpoint to send emails from the backend.",
    confirmationData,
  );
  return null;
}

export async function sendWelcomeEmail(userData) {
  console.warn(
    "sendWelcomeEmail() is a browser stub. Configure a server endpoint to send emails from the backend.",
    userData,
  );
  return null;
}

export async function sendPasswordResetEmail(resetData) {
  console.warn(
    "sendPasswordResetEmail() is a browser stub. Configure a server endpoint to send emails from the backend.",
    resetData,
  );
  return null;
}

export async function sendBulkEmails(recipients, emailData) {
  console.warn(
    "sendBulkEmails() is a browser stub. Configure a server endpoint to send emails from the backend.",
    { recipients, emailData },
  );
  return null;
}
