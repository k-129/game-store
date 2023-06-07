import axios from 'axios';

/* Axios Service that deals with Project Requests */

class IronGamesService {
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

  // POST /api/games
  createGame = requestBody => {
    return this.api.post('/api/ironhack/add-game', requestBody);
  };

  // GET /api/games
  getAllGames = () => {
    return this.api.get('/api/ironhack/games');
  };

  // GET /api/games/:id
  getGame = id => {
    return this.api.get(`/api/ironhack/games/${id}`);
  };


  // PUT 
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/ironhack/games/edit/${id}`, requestBody);
  };

  // DELETE /api/games/:id
  deleteGame = id => {
    return this.api.delete(`/api/ironhack/games/${id}`);
  };
}

// Coudinary
const uploadImage = (file) => {
  return api
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

// Create one instance object
const ironGamesService = new IronGamesService();

export {uploadImage, ironGamesService};
