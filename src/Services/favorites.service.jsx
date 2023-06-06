import axios from 'axios';

/* Axios Service that deals with Project Requests */

class FavService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_API_URL 
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // PUT 
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games/edit/${id}`, requestBody);
  };

  // DELETE /api/games/:id
  deleteGame = id => {
    return this.api.delete(`/api/games/${id}`);
  };
}

// Create one instance object
const favService = new FavService();

export default favService;
