export const CONFIG = {
  API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  TOKEN_KEY: 'godesign_token',
  REFRESH_KEY: 'godesign_refresh'
}
