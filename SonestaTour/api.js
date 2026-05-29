// =====================================================
// SONESTATOUR API SERVICE
// Automatically fetches from API when available
// Falls back to local data.js otherwise
// =====================================================

const API_BASE = window.location.port === '8888' 
    ? 'http://localhost:3000'  // Static server on 8888, API on 3000
    : '';  // Same origin

class SonestaAPI {
    constructor() {
        this.baseUrl = API_BASE;
        this.useApi = false;
        this.init();
    }

    async init() {
        // Check if API is available
        try {
            const response = await fetch(`${this.baseUrl}/api/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                this.useApi = true;
                console.log('📡 SonestaTour: Using PostgreSQL API');
            }
        } catch (e) {
            console.log('📦 SonestaTour: Using local data (API not available)');
        }
    }

    async get(endpoint) {
        if (!this.useApi) return null;
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`API error on ${endpoint}:`, error);
            return null;
        }
    }

    async post(endpoint, data) {
        if (!this.useApi) return null;
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`API error on ${endpoint}:`, error);
            return null;
        }
    }

    // Destinations
    async getDestinations() {
        const data = await this.get('/api/destinations');
        return data || window.SonestaData?.destinations || [];
    }

    async getDestination(id) {
        const data = await this.get(`/api/destinations/${id}`);
        return data || window.SonestaData?.destinations?.find(d => d.id === id);
    }

    // Hotels
    async getHotels(filters = {}) {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.search) params.set('search', filters.search);
        
        const endpoint = `/api/hotels${params.toString() ? '?' + params : ''}`;
        const data = await this.get(endpoint);
        return data || window.SonestaData?.hotels || [];
    }

    async getHotel(id) {
        const data = await this.get(`/api/hotels/${id}`);
        return data || window.SonestaData?.hotels?.find(h => h.id === id);
    }

    // Tours
    async getTours(filters = {}) {
        const params = new URLSearchParams();
        if (filters.destination) params.set('destination', filters.destination);
        if (filters.duration) params.set('duration', filters.duration);
        if (filters.hot) params.set('hot', filters.hot);
        
        const endpoint = `/api/tours${params.toString() ? '?' + params : ''}`;
        const data = await this.get(endpoint);
        return data || window.SonestaData?.tours || [];
    }

    async getTour(id) {
        const data = await this.get(`/api/tours/${id}`);
        return data || window.SonestaData?.tours?.find(t => t.id === id);
    }

    // Cruises
    async getCruises(filters = {}) {
        const params = new URLSearchParams();
        if (filters.duration) params.set('duration', filters.duration);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        
        const endpoint = `/api/cruises${params.toString() ? '?' + params : ''}`;
        const data = await this.get(endpoint);
        return data || window.SonestaData?.cruises || [];
    }

    async getCruise(id) {
        const data = await this.get(`/api/cruises/${id}`);
        return data || window.SonestaData?.cruises?.find(c => c.id === id);
    }

    // Flights
    async getFlights(filters = {}) {
        const params = new URLSearchParams();
        if (filters.from) params.set('from', filters.from);
        if (filters.to) params.set('to', filters.to);
        if (filters.direct) params.set('direct', filters.direct);
        
        const endpoint = `/api/flights${params.toString() ? '?' + params : ''}`;
        const data = await this.get(endpoint);
        return data || window.SonestaData?.flights || [];
    }

    async getFlight(id) {
        const data = await this.get(`/api/flights/${id}`);
        return data || window.SonestaData?.flights?.find(f => f.id === id);
    }

    // Promotions
    async getPromotions(filters = {}) {
        const params = new URLSearchParams();
        if (filters.active) params.set('active', 'true');
        
        const endpoint = `/api/promotions${params.toString() ? '?' + params : ''}`;
        const data = await this.get(endpoint);
        return data || window.SonestaData?.promotions || [];
    }

    async getPromotion(id) {
        const data = await this.get(`/api/promotions/${id}`);
        return data || window.SonestaData?.promotions?.find(p => p.id === id);
    }

    // Reviews
    async getReviews(hotelId = null) {
        const endpoint = hotelId 
            ? `/api/reviews?hotelId=${hotelId}` 
            : '/api/reviews';
        const data = await this.get(endpoint);
        return data || window.SonestaData?.reviews || [];
    }

    // Applications
    async submitApplication(applicationData) {
        const apiResult = await this.post('/api/applications', applicationData);
        
        // If API is available, use it; otherwise fall back to localStorage
        if (apiResult?.success) {
            return apiResult;
        }
        
        // Fallback to email-service
        if (window.sendApplicationEmail) {
            await window.sendApplicationEmail(
                applicationData,
                applicationData.type || 'Бронирование',
                applicationData.itemName || ''
            );
            return { success: true, fallback: true };
        }
        
        throw new Error('Could not submit application');
    }

    // Favorites
    async getFavorites() {
        const sessionId = this.getSessionId();
        return await this.get(`/api/favorites?sessionId=${sessionId}`);
    }

    async addFavorite(itemType, itemId) {
        if (this.useApi) {
            return await this.post('/api/favorites', { itemType, itemId });
        }
        return null;
    }

    async removeFavorite(itemType, itemId) {
        if (this.useApi) {
            const sessionId = this.getSessionId();
            return await this.get(`/api/favorites/delete?itemType=${itemType}&itemId=${itemId}&sessionId=${sessionId}`);
        }
        return null;
    }

    // Search
    async search(query) {
        const data = await this.get(`/api/search?q=${encodeURIComponent(query)}`);
        return data || { hotels: [], tours: [], destinations: [] };
    }

    // Stats (admin)
    async getStats() {
        return await this.get('/api/stats');
    }

    // Utility
    getSessionId() {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }
}

// Create global instance
window.SonestaAPI = new SonestaAPI();
