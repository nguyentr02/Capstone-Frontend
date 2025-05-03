import { authFetch } from './authRefresh.js';

const API_BASE_URL = 'https://eventregistrationsystem-backend.onrender.com/api';

/**
 * 统一解析响应并抛出错误
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
// Ticket-related APIs
// ==========================

/**
 * 获取指定活动的所有票种
 * @param {number} eventId
 * @returns {Promise<Array>} Ticket[]
 */
export const fetchTicketTypes = async (eventId) => {
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}/tickets`);
  const json = await handleResponse(res);
  return json.data;
};

/**
 * 创建新的票种
 * @param {number} eventId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Ticket
 */
export const createTicketType = async (eventId, ticketData) => {
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  const json = await handleResponse(res);
  return json.data;
};

/**
 * 更新已有票种
 * @param {number} eventId
 * @param {number} ticketId
 * @param {Object} ticketData
 * @returns {Promise<Object>} Ticket
 */
export const updateTicketType = async (eventId, ticketId, ticketData) => {
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  const json = await handleResponse(res);
  return json.data;
};

/**
 * 删除指定票种
 * @param {number} eventId
 * @param {number} ticketId
 * @returns {Promise<string>} 删除成功消息
 */
export const deleteTicketType = async (eventId, ticketId) => {
  const res = await authFetch(`${API_BASE_URL}/events/${eventId}/tickets/${ticketId}`, {
    method: 'DELETE'
  });
  const json = await handleResponse(res);
  return json.message || 'Ticket type deleted successfully';
};
