// this is atickets.js

const API_BASE_URL = 'https://eventregistrationsystem-backend.onrender.com/api'

// ==========================
// Ticket-related API methods
// ==========================

/**
 * Fetch all ticket types for a given event
 * @param {number} eventId
 * @returns {Promise<Array>} Array of ticket types
 */
export const fetchTicketTypes = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`)
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, data: Ticket[] }
  return result.data                      // Ticket[]
}

/**
 * Create a new ticket type for an event
 * @param {number} eventId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Newly created ticket type
 */
export const createTicketType = async (eventId, ticketData) => {
  const token = localStorage.getItem('token') || ''
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(ticketData)
  })
  if (!response.ok) {
    throw new Error(`Create ticket type failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, data: Ticket }
  return result.data                      // Ticket
}

/**
 * Update an existing ticket type
 * @param {number} eventId
 * @param {number} ticketId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Updated ticket type
 */
export const updateTicketType = async (eventId, ticketId, ticketData) => {
  const token = localStorage.getItem('token') || ''
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(ticketData)
  })
  if (!response.ok) {
    throw new Error(`Update ticket type failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, data: Ticket }
  return result.data                      // Ticket
}

/**
 * Delete a ticket type
 * @param {number} eventId
 * @param {number} ticketId
 * @returns {Promise<Object>} Result of delete operation
 */
export const deleteTicketType = async (eventId, ticketId) => {
  const token = localStorage.getItem('token') || ''
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(`Delete ticket type failed with status: ${response.status}`)
  }
  const result = await response.json()    // { success, message }
  return result                           // { success, message }
}
