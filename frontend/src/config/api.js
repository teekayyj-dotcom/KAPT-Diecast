const LOCAL_API_BASE_URL = 'http://localhost:8001'
const PRODUCTION_API_BASE_URL = 'https://api.teekayyj.id.vn'

const isLocalHost = (hostname) =>
  hostname === 'localhost' || hostname === '127.0.0.1'

const resolveApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, '')
  }

  if (typeof window !== 'undefined' && !isLocalHost(window.location.hostname)) {
    return PRODUCTION_API_BASE_URL
  }

  return LOCAL_API_BASE_URL
}

export const API_BASE_URL = resolveApiBaseUrl()

export const buildApiUrl = (path = '') => {
  if (!path) return API_BASE_URL
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
