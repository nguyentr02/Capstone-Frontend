const API_BASE_URL = 'http://localhost:3000/api' // TODO: replace with your real backend URL

// ==========================
// Ticket-related API methods
// ==========================

/**
 * Fetch all ticket types for a given event
 * @param {Number} eventId
 * @returns {Promise<Array>} Array of ticket types
 */
export const fetchTicketTypes = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`)
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }
    // Assumes response JSON structure: { ticketTypes: [...] }
    const data = await response.json()
    return data.ticketTypes
  } catch (error) {
    console.error(`Error fetching ticket types for event ${eventId}:`, error)
    throw error
  }
}

/**
 * Create a new ticket type for an event
 * @param {Number} eventId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Newly created ticket type
 */
export const createTicketType = async (eventId, ticketData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    })
    if (!response.ok) {
      throw new Error(`Create ticket type failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data.ticketType
  } catch (error) {
    console.error(`Error creating ticket type for event ${eventId}:`, error)
    throw error
  }
}

/**
 * Update an existing ticket type
 * @param {Number} eventId
 * @param {Number} ticketId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Updated ticket type
 */
export const updateTicketType = async (eventId, ticketId, ticketData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
      method: 'PUT', // or PATCH depending on backend
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    })
    if (!response.ok) {
      throw new Error(`Update ticket type failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data.ticketType
  } catch (error) {
    console.error(`Error updating ticket type ${ticketId} for event ${eventId}:`, error)
    throw error
  }
}

/**
 * Delete a ticket type
 * @param {Number} eventId
 * @param {Number} ticketId
 * @returns {Promise<Object>} Result of delete operation
 */
export const deleteTicketType = async (eventId, ticketId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(`Delete ticket type failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error deleting ticket type ${ticketId} for event ${eventId}:`, error)
    throw error
  }
}
