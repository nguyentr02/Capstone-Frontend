// src/api/auth.js
const API_BASE = 'https://eventregistrationsystem-backend.onrender.com/api'

/**
 * Call refresh-token endpoint to get a new accessToken.
 * The browser will automatically send the HTTP-only refreshToken cookie.
 */
export async function refreshAccessToken() {
  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: 'POST',
//    credentials: 'include'        // ← bring refreshToken cookie 
                                  // This way the browser will automatically store/carry HTTP-only cookies
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.message || 'Failed to refresh token')
  }
 // Backend returns { success:true, data:{ accessToken: '...' } }
  return json.data.accessToken
}
