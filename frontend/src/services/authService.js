import api from './api';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('founder', response.data.founder);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('founder');
  },

  verify: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Verify error:', error);
      localStorage.removeItem('access_token');
      return null;
    }
  },

  getCurrentUser: () => {
    return {
      founder: localStorage.getItem('founder'),
      token: localStorage.getItem('access_token'),
    };
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};
