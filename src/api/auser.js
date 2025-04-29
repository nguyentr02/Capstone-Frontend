// this is auser.js
import { authFetch } from './authRefresh.js';

const API_BASE_URL = 'https://eventregistrationsystem-backend.onrender.com/api'

// ==========================
// User-related API methods
// ==========================

/**
 * Fetch current user profile
 * @returns {Promise<Object>} User object without password
 */
export const fetchUserProfile = async () => {
  const response = await authFetch(`${API_BASE_URL}/users/profile`)
  if (!response.ok) {
    throw new Error(`Fetch user profile failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, data: User }
  return result.data                      // User
}

/**
 * Update current user profile
 * @param {Object} userData
 * @param {string} [userData.firstName]
 * @param {string} [userData.lastName]
 * @param {string} [userData.email]
 * @param {string} [userData.phoneNo]
 * @returns {Promise<Object>} Updated user object without password
 */
export const updateUserProfile = async (userData) => {
  const response = await authFetch(`${API_BASE_URL}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    throw new Error(`Update user profile failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, data: User }
  return result.data                      // User
}

/**
 * Change current user password
 * @param {Object} passwords
 * @param {string} passwords.currentPassword
 * @param {string} passwords.newPassword
 * @returns {Promise<{ success: boolean }>} Operation result
 */
export const changeUserPassword = async ({ currentPassword, newPassword }) => {
  const response = await authFetch(`${API_BASE_URL}/users/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentPassword, newPassword })
  })
  if (!response.ok) {
    throw new Error(`Change password failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, data: { success: boolean } }
  return result.data                      // { success: boolean }
}
