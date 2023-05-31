import axios from 'axios';

/* Axios Service that deals with Project Requests */

class GamesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:5005'
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

  // POST /api/projects
  createGame = requestBody => {
    return this.api.post('/api/games-list', requestBody);
  };

  // GET /api/projects
  getAllGames = () => {
    return this.api.get('/api/games-list');
  };

  // GET /api/projects/:id
  getGame = id => {
    return this.api.get(`/api/games-list/${id}`);
  };

  // PUT /api/projects/:id
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games-list/${id}`, requestBody);
  };

  // DELETE /api/projects/:id
  deleteGame = id => {
    return this.api.delete(`/api/games-list/${id}`);
  };
}

// Create one instance object
const gamesService = new GamesService();

export default gamesService;
