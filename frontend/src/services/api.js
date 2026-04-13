import { getFirebaseToken } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

export const fetchWithAuth = async (path, options = {}) => {
  const token = await getFirebaseToken()

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

