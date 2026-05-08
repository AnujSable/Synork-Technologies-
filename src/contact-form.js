/**
 * Contact Form Handler Module
 * Manages contact form submissions using Firebase Firestore and EmailJS
 */

import { saveContactInquiry } from "./firebase-db.js";
import { sendContactFormEmail, initializeEmailJS } from "./emailjs-service.js";
import { getCurrentUser } from "./firebase-auth.js";

// Initialize client email helper on module load
initializeEmailJS();

/**
 * Handle contact form submission
 * @param {Event} e - Form submission event
 * @param {HTMLElement} formElement - The form element
 * @param {HTMLElement} statusElement - Status message element
 */
export async function handleContactFormSubmit(e, formElement, statusElement) {
  e.preventDefault();

  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";
  const btnId = submitBtn ? submitBtn.id : "";

  // Get form data
  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());

  // Validate required fields
  const requiredFields = ["name", "email", "service", "details"];
  const missingFields = requiredFields.filter(
    (field) => !data[field] || !data[field].trim(),
  );

  if (missingFields.length > 0) {
    showStatus(statusElement, "Please fill out all required fields.", "error");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showStatus(statusElement, "Please enter a valid email address.", "error");
    return;
  }

  try {
    // Update button to show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="material-symbols-rounded" style="font-size:20px;animation:spin 1s linear infinite;">progress_activity</span> Sending...';
    }

    showStatus(statusElement, "Submitting your inquiry...", "pending");

    const currentUser = await getCurrentUser();
    const contactData = {
      name: data.name.trim(),
      email: data.email.trim(),
      service: data.service,
      details: data.details.trim(),
      phone: data.phone ? data.phone.trim() : "",
      company: data.company ? data.company.trim() : "",
      userId: currentUser ? currentUser.uid : null,
      userEmail: currentUser ? currentUser.email : data.email.trim(),
      source: "web_form",
    };

    // Save to Firestore
    const inquiryId = await saveContactInquiry(contactData);

    // Send emails (non-blocking on error)
    try {
      await sendContactFormEmail(contactData);
    } catch (emailError) {
      console.warn(
        "Email notification failed, but inquiry was saved:",
        emailError,
      );
    }

    // Success message
    showStatus(
      statusElement,
      "✓ Inquiry submitted successfully! We'll be in touch within 24 hours.",
      "success",
    );

    // Reset form
    formElement.reset();

    // Restore button after delay
    if (submitBtn) {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }, 2000);
    }

    return inquiryId;
  } catch (error) {
    console.error("Contact form submission error:", error);

    showStatus(
      statusElement,
      "Failed to submit inquiry. Please email synorktechnologies@gmail.com directly.",
      "error",
    );

    // Restore button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }

    throw error;
  }
}

/**
 * Display status message in the UI
 * @param {HTMLElement} element - Status message element
 * @param {string} message - Message text
 * @param {string} type - Message type: 'success', 'error', 'pending'
 */
function showStatus(element, message, type) {
  if (!element) return;

  element.textContent = message;
  element.className = "form-status";

  switch (type) {
    case "success":
      element.classList.add("success");
      break;
    case "error":
      element.classList.add("error");
      break;
    case "pending":
      element.classList.add("pending");
      break;
  }
}

/**
 * Attach contact form handlers to page
 * Call this function once on page load
 */
export function initializeContactForms() {
  // Contact form handler
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (e) => {
      handleContactFormSubmit(e, contactForm, contactStatus);
    });
  }

  // Get started form handler
  const getStartedForm = document.getElementById("getStartedForm");
  const gsStatus = document.getElementById("gsStatus");
  if (getStartedForm && gsStatus) {
    getStartedForm.addEventListener("submit", (e) => {
      handleContactFormSubmit(e, getStartedForm, gsStatus);
    });
  }
}
