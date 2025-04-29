// aevents.js

const API_BASE_URL = 'https://eventregistrationsystem-backend.onrender.com/api';

/**
 * Helper: Parse JSON and throw errors uniformly
 * @param {Response} res
 * @returns {Promise<Object>} json
 */
const handleResponse = async (res) => {
  const json = await res.json();
  if (!res.ok) {
    // The backend may return one of { error, message }
    throw new Error(json.message || json.error || `Request failed with status ${res.status}`);
  }
  return json;
};

/**
 * Helper: Get Bearer token
 * @returns {string}
 */
const getAuthHeader = () => {
  const token = localStorage.getItem('token') || '';
  return { Authorization: `Bearer ${token}` };
};

// ==========================
// Event-related APIs
// ==========================

/**
 * Fetch events with pagination info
 * @param {Object} params - page, limit, search, eventType, location, isFree, startDate, endDate, myEvents, status
 * @returns {Promise<{ events: Array, pagination: Object }>}
 */
export const fetchEvents = async (params = {}) => {
  const url = new URL(`${API_BASE_URL}/events`);
  Object.entries(params).forEach(([key, val]) => {
    if (val != null) url.searchParams.append(key, String(val));
  });

  const res = await fetch(url.toString());
  const json = await handleResponse(res);
  // 假设后端返回 { success, data: { events, pagination } }
  return {
    events: json.data.events,
    pagination: json.data.pagination
  };
};

/**
 * Fetch single event details
 * @param {number} eventId
 * @returns {Promise<Object>} Event object
 */
export const fetchEventDetails = async (eventId) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}`);
  const json = await handleResponse(res);
  // Assume the backend returns { success, data: { …event } }
  return json.data;
};

/**
 * Create a new event
 * @param {Object} eventData
 * @returns {Promise<Object>} Created event
 */
export const createEvent = async (eventData) => {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(eventData),
  });
  const json = await handleResponse(res);
  return json.data;
};

/**
 * Update existing event
 * @param {number} eventId
 * @param {Object} updatedData
 * @returns {Promise<Object>} Updated event
 */
export const updateEvent = async (eventId, updatedData) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(updatedData),
  });
  const json = await handleResponse(res);
  return json.data;
};

/**
 * Delete an event
 * @param {number} eventId
 * @returns {Promise<string>} Success message
 */
export const deleteEvent = async (eventId) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  const json = await handleResponse(res);
  return json.message || 'Event deleted successfully';
};

// ==========================
// Ticket-related APIs
// ==========================

/**
 * Fetch ticket types for an event
 * @param {number} eventId
 * @returns {Promise<Array>} Ticket array
 */
export const fetchTicketTypes = async (eventId) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`);
  const json = await handleResponse(res);
  // 假设后端返回 { success, data: ticketsArray }
  return json.data;
};

/**
 * Create a ticket type
 * @param {number} eventId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Created ticket
 */
export const createTicketType = async (eventId, ticketData) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(ticketData),
  });
  const json = await handleResponse(res);
  return json.data;
};

/**
 * Update a ticket type
 * @param {number} eventId
 * @param {number} ticketId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Updated ticket
 */
export const updateTicketType = async (eventId, ticketId, ticketData) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(ticketData),
  });
  const json = await handleResponse(res);
  return json.data;
};

/**
 * Delete a ticket type
 * @param {number} eventId
 * @param {number} ticketId
 * @returns {Promise<string>} Success message
 */
export const deleteTicketType = async (eventId, ticketId) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  const json = await handleResponse(res);
  return json.message || 'Ticket type deleted successfully';
};

/**
 * Fetch attendees for an event
 * @param {number} eventId
 * @returns {Promise<Array>} Attendee list
 */
export const fetchAttendees = async (eventId) => {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/attendees`);
  const json = await handleResponse(res);
  // Assume the backend returns { success, data: attendeesArray }
  return json.data;
};

