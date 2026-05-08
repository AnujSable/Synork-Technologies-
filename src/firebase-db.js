/**
 * Supabase Database Module
 * Handles all Supabase database operations
 */

import { supabase } from "./firebase-config.js";

/**
 * Save a contact inquiry to Supabase
 * @param {object} contactData - Contact form data
 * @returns {Promise<string>} Record ID
 */
export async function saveContactInquiry(contactData) {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        ...contactData,
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error("Error saving contact inquiry:", error);
    throw new Error("Failed to save contact inquiry");
  }
}

/**
 * Save user profile data
 * @param {string} userId - User ID
 * @param {object} userData - User profile data
 * @returns {Promise<void>}
 */
export async function updateUserProfile(userId, userData) {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update profile");
  }
}

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Promise<object>} User profile data
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

/**
 * Get all contact inquiries for a user
 * @param {string} userId - User ID
 * @param {number} limitCount - Number of records to fetch
 * @returns {Promise<array>} Array of contact inquiries
 */
export async function getUserInquiries(userId, limitCount = 50) {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limitCount);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user inquiries:", error);
    throw new Error("Failed to fetch inquiries");
  }
}

/**
 * Update contact inquiry status
 * @param {string} inquiryId - Inquiry ID
 * @param {string} status - New status
 * @returns {Promise<void>}
 */
export async function updateInquiryStatus(inquiryId, status) {
  try {
    const { error } = await supabase
      .from('contact_inquiries')
      .update({
        status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', inquiryId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    throw new Error("Failed to update inquiry");
  }
}

/**
 * Delete a contact inquiry
 * @param {string} inquiryId - Inquiry ID
 * @returns {Promise<void>}
 */
export async function deleteInquiry(inquiryId) {
  try {
    const { error } = await supabase
      .from('contact_inquiries')
      .delete()
      .eq('id', inquiryId);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    throw new Error("Failed to delete inquiry");
  }
}

/**
 * Get all recent contact inquiries (admin function)
 * @param {number} limitCount - Number of records to fetch
 * @returns {Promise<array>} Array of contact inquiries
 */
export async function getAllInquiries(limitCount = 100) {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limitCount);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    throw new Error("Failed to fetch inquiries");
  }
}

/**
 * Search user documents by email
 * @param {string} email - Email to search for
 * @returns {Promise<array>} Array of matching users
 */
export async function searchUsersByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Failed to search users");
  }
}
