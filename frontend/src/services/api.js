import { getAuthToken } from './authService'
import { API_BASE_URL } from '../config/api'

export const fetchWithAuth = async (path, options = {}) => {
  const token = await getAuthToken()

  if (!token) {
    throw new Error('User not authenticated')
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  }

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })
}

export const getProfile = async () => {
  const response = await fetchWithAuth('/me')

  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }

  return response.json()
}
