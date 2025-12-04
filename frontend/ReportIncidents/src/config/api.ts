// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
  TIMEOUT: 30000, // 30 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  
  // Incidents
  INCIDENTS: '/api/incidents',
  INCIDENT_BY_ID: (id: string) => `/api/incidents/${id}`,
  ADMIN_INCIDENTS: '/api/admin/incidents',
  
  // Alerts
  ALERTS: '/api/alerts',
  
  // Check-ins
  CHECK_INS: '/api/check-ins',
  
  // Subscribers
  SUBSCRIBE: '/api/subscribers/subscribe',
  UNSUBSCRIBE: '/api/subscribers/unsubscribe',
};
