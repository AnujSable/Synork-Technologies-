/**
 * Supabase Authentication Module
 * Handles user login, signup, logout, and password management
 */

import { supabase } from "./firebase-config.js";

/**
 * Sign up a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User's full name
 * @param {object} additionalData - Additional user profile data
 * @returns {Promise<object>} User object with profile
 */
export async function signupUser(
  email,
  password,
  fullName,
  additionalData = {},
) {
  try {
    // Create user account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("User creation failed");

    // Store user profile in Supabase
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...additionalData,
      });

    if (profileError) throw profileError;

    return {
      uid: user.id,
      email: user.email,
      fullName: fullName,
      ...additionalData,
    };
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(getAuthErrorMessage(error.message));
  }
}

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} User object with profile
 */
export async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("Login failed");

    // Fetch user profile from Supabase
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    return profile || {
      uid: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name || email,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(getAuthErrorMessage(error.message));
  }
}

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem("synork_user");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Failed to logout");
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<void>}
 */
export async function resetPassword(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    console.error("Password reset error:", error);
    throw new Error(getAuthErrorMessage(error.message));
  }
}

/**
 * Monitor authentication state changes
 * @param {function} callback - Callback function(user)
 * @returns {function} Unsubscribe function
 */
export function onAuthStateListener(callback) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      // Fetch full user profile
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      const userData = error ? {
        uid: session.user.id,
        email: session.user.email,
        fullName: session.user.user_metadata?.full_name || session.user.email,
      } : profile;

      callback(userData);
    } else {
      callback(null);
    }
  });
}

/**
 * Get current authenticated user
 * @returns {object|null} Current user or null
 */
export function getCurrentUser() {
  return supabase.auth.getUser().then(({ data }) => data.user);
}

/**
 * Convert Supabase error messages to user-friendly messages
 * @param {string} message - Supabase error message
 * @returns {string} User-friendly error message
 */
function getAuthErrorMessage(message) {
  const messages = {
    "User already registered": "This email is already registered.",
    "Invalid email": "Invalid email address.",
    "Password should be at least 6 characters": "Password must be at least 6 characters.",
    "Email not confirmed": "Please confirm your email.",
    "Invalid login credentials": "Invalid email or password.",
    "Too many requests": "Too many failed attempts. Please try again later.",
  };

  return messages[message] || "An error occurred. Please try again.";
}
