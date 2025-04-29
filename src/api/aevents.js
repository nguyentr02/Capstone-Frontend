import { authFetch } from './authFetch.js';

const API_BASE_URL = 'https://eventregistrationsystem-backend.onrender.com/api';

/**
 * Helper: Parse JSON and throw errors uniformly
 * @param {Response} res
 * @returns {Promise<Object>} json
 */
const handleResponse = async (res) => {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || json.error || `Request failed with status ${res.status}`);
  }
  return json;
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

  const res = await authFetch(url.toString());
  const json = await handleResponse(res);
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
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}`);
  const json = await handleResponse(res);
  return json.data;
};

/**
 * Create a new event
 * @param {Object} eventData
 * @returns {Promise<Object>} Created event
 */
export const createEvent = async (eventData) => {
  const res = await authFetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
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
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
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
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE'
  });
  const json = await handleResponse(res);
  return json.message || 'Event deleted successfully';
};


