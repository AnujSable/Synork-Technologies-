import "./style.css";
import { initializeContactForms } from "./contact-form.js";
import { onAuthStateListener } from "./firebase-auth.js";

// Initialize contact forms when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeContactForms();

  // Monitor authentication state
  onAuthStateListener((user) => {
    if (user) {
      // User is logged in
      document.body.classList.add("logged-in");
    } else {
      // User is logged out
      document.body.classList.remove("logged-in");
    }
  });
});
