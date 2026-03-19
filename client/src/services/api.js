import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authAPI = {
  register: (email, password, name) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

const zonesAPI = {
  getAllZones: () => apiClient.get('/zones'),
  getZoneById: (id) => apiClient.get(`/zones/${id}`),
  getActiveZones: () => apiClient.get('/zones/active'),
  searchZones: (location) => apiClient.get('/zones/search', { params: { location } }),
  createZone: (data) => apiClient.post('/zones', data),
  updateZone: (id, data) => apiClient.put(`/zones/${id}`, data),
  deleteZone: (id) => apiClient.delete(`/zones/${id}`),
  updateZoneRiskScore: (id, riskScore) =>
    apiClient.put(`/zones/${id}/risk-score`, null, { params: { riskScore } }),
};

const contributionsAPI = {
  createContribution: (data) => apiClient.post('/contributions', data),
  getContributionsByUserId: (userId) =>
    apiClient.get(`/contributions/user/${userId}`),
  getContributionsByZoneId: (zoneId) =>
    apiClient.get(`/contributions/zone/${zoneId}`),
  getMyContributions: () => apiClient.get('/contributions/my-contributions'),
  updateContribution: (id, data) => apiClient.put(`/contributions/${id}`, data),
  deleteContribution: (id) => apiClient.delete(`/contributions/${id}`),
  getTotalMoneyContributions: (zoneId) =>
    apiClient.get(`/contributions/zone/${zoneId}/total-money`),
};

const environmentalAPI = {
  getCurrentData: (location) =>
    apiClient.get('/environment/current', { params: { location } }),
  saveEnvironmentalData: (data) => apiClient.post('/environment/save', null, {
    params: {
      location: data.location,
      rainfall: data.rainfall,
      temperature: data.temperature,
      humidity: data.humidity,
      forecast: data.forecast,
      weatherCondition: data.weatherCondition,
      cumulativeRainfall: data.cumulativeRainfall,
    },
  }),
};

const riskAssessmentAPI = {
  calculateRisk: (rainfall, forecast, humidity) =>
    apiClient.get('/risk-assessment/calculate', {
      params: { rainfall, forecast, humidity },
    }),
};

const needsEstimationAPI = {
  estimateNeeds: (zoneId) => apiClient.get(`/zones/${zoneId}/needs`),
};

const usersAPI = {
  getAllUsers: () => apiClient.get('/users'),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  updateUserRole: (id, role) => apiClient.put(`/users/${id}/role`, { role }),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  updateProfile: (name) => apiClient.put('/users/profile/update', { name }),
  getAdminStatistics: () => apiClient.get('/users/admin/statistics'),
};

export {
  authAPI,
  zonesAPI,
  contributionsAPI,
  environmentalAPI,
  riskAssessmentAPI,
  needsEstimationAPI,
  usersAPI,
};
