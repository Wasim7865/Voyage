const API_BASE = '/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  // Auth
  login(email, password) {
    return this.request('/auth/login', { method: 'POST', body: { email, password } });
  }

  register(name, email, password) {
    return this.request('/auth/register', { method: 'POST', body: { name, email, password } });
  }

  getMe() {
    return this.request('/auth/me');
  }

  updateProfile(data) {
    return this.request('/auth/profile', { method: 'PUT', body: data });
  }

  changePassword(data) {
    return this.request('/auth/password', { method: 'PUT', body: data });
  }

  // Destinations
  getDestinations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/destinations?${query}`);
  }

  getDestination(id) {
    return this.request(`/destinations/${id}`);
  }

  getFeaturedDestinations() {
    return this.request('/destinations/featured');
  }

  getTrendingDestinations() {
    return this.request('/destinations/trending');
  }

  // Trips
  getTrips(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/trips?${query}`);
  }

  getTrip(id) {
    return this.request(`/trips/${id}`);
  }

  createTrip(data) {
    return this.request('/trips', { method: 'POST', body: data });
  }

  updateTrip(id, data) {
    return this.request(`/trips/${id}`, { method: 'PUT', body: data });
  }

  deleteTrip(id) {
    return this.request(`/trips/${id}`, { method: 'DELETE' });
  }

  getTripStats() {
    return this.request('/trips/stats');
  }

  updateItinerary(tripId, itinerary) {
    return this.request(`/trips/${tripId}/itinerary`, { method: 'PUT', body: { itinerary } });
  }

  updateBudget(tripId, budget) {
    return this.request(`/trips/${tripId}/budget`, { method: 'PUT', body: budget });
  }

  // AI
  aiChat(message, conversationId, type) {
    return this.request('/ai/chat', { method: 'POST', body: { message, conversationId, type } });
  }

  planTrip(data) {
    return this.request('/ai/plan-trip', { method: 'POST', body: data });
  }

  optimizeItinerary(tripId) {
    return this.request('/ai/optimize-itinerary', { method: 'POST', body: { tripId } });
  }

  getBudgetPlan(data) {
    return this.request('/ai/budget-plan', { method: 'POST', body: data });
  }

  getPackingList(data) {
    return this.request('/ai/packing-list', { method: 'POST', body: data });
  }

  // Saved Destinations
  getSavedDestinations() {
    return this.request('/saved-destinations');
  }

  saveDestination(destinationId, data = {}) {
    return this.request('/saved-destinations', { method: 'POST', body: { destinationId, ...data } });
  }

  removeSavedDestination(id) {
    return this.request(`/saved-destinations/${id}`, { method: 'DELETE' });
  }

  // Users (Admin)
  getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/users?${query}`);
  }

  getAdminStats() {
    return this.request('/users/stats');
  }

  deleteUser(id) {
    return this.request(`/users/${id}`, { method: 'DELETE' });
  }
}

export default new ApiService();
