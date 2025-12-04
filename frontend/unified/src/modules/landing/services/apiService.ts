import { API_CONFIG, API_ENDPOINTS } from '../config/api';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface IncidentData {
  type: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  photoURL?: string;
  status?: string;
}

// API Service Class
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * Submit incident report with photo
   */
  async createIncident(formData: FormData): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.INCIDENTS, {
      method: 'POST',
      body: formData, // Don't set Content-Type for FormData
    });
  }

  /**
   * Get all public incidents
   */
  async getPublicIncidents(): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.INCIDENTS, {
      method: 'GET',
    });
  }

  /**
   * Get all incidents (Admin)
   */
  async getAllIncidents(token: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.ADMIN_INCIDENTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Update incident status (Admin)
   */
  async updateIncidentStatus(
    id: string,
    status: string,
    token: string
  ): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.INCIDENT_BY_ID(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  }

  /**
   * Get all alerts
   */
  async getAlerts(): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.ALERTS, {
      method: 'GET',
    });
  }

  /**
   * Create alert (Admin)
   */
  async createAlert(
    alertData: {
      title: string;
      message: string;
      area: any;
    },
    token: string
  ): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.ALERTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(alertData),
    });
  }

  /**
   * Submit "I'm Safe" check-in
   */
  async submitCheckIn(data: {
    identifier: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
  }): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.CHECK_INS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Subscribe to SMS alerts
   */
  async subscribeToAlerts(phoneNumber: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.SUBSCRIBE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });
  }

  /**
   * Unsubscribe from SMS alerts
   */
  async unsubscribeFromAlerts(phoneNumber: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.UNSUBSCRIBE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });
  }

  /**
   * Admin login
   */
  async login(username: string, password: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
