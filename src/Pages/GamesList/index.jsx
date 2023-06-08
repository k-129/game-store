import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import gamesService from "../../Services/games.service";
import Nav from "../../Components/Nav";
import "../../App.css";
import SearchBar from "../../Components/SearchBar";
import FavoriteRoute from "../Favorites";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import AOS from 'aos';
/* import 'aos/dist/aos.css';
 */
export default function GamesListPage() {
  const [games, setGames] = useState([]);
  const [gamesFiltered, setGamesFiltered] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [publisher, setPublisher] = useState("");

  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  // function that gets projects via axios
  const getAllGames = () => {
    gamesService
      .getAllGames()
      .then((response) => {
        setGames(response.data);
        setGamesFiltered(response.data);
        setFetching(false);
        console.log("fetching");
      })
      .catch((error) => console.log(error));
  };

  const getSearchGames = () => {
    if (searchQuery !== "") {
      const result = [];

      for (let i = 0; i < games.length; i++) {
        if (games[i].title.toLowerCase().includes(searchQuery.toLowerCase())) {
          result.push(games[i]);
        }
      }

      setGamesFiltered(result);
    } else if (searchQuery === "") {
      getAllGames();
    }
  };

  useEffect(() => {
    getSearchGames();
  }, [searchQuery]);

  // setting a side-effect after initial rendering of component that is
  // calling getAllGames function
  const getUpdateUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile-fav/${user._id}`
    );
    setCurrentUser(response.data);
    localStorage.setItem('favorites', JSON.stringify(response.data.favGames));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      favGames: JSON.parse(storedFavorites),
    }));
  }
    getAllGames();
    getUpdateUser();
  }, []);

  const gamesFilter = () => {
    if (genre !== "") {
      setGamesFiltered(games.filter((game) => game.genre === genre));
    }
    if (platform !== "") {
      setGamesFiltered(games.filter((game) => game.platform === platform));
    }
    if (publisher !== "") {
      setGamesFiltered(games.filter((game) => game.publisher === publisher));
    }
  };

  useEffect(() => {
    gamesFilter();
  }, [genre, platform, publisher]);

  const removeGame = async (gameId) => {
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/remove-favorites/${
        user._id
      }/${gameId}`
    );
    getUpdateUser();
  };

  const addGame = async (gameId) => {
    // Check if the game is already in favorites
    if (currentUser.favGames.includes(gameId)) {
      return;
    }

    await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/add-favorites/${
        user._id
      }/${gameId}`
    );
    getUpdateUser();
  };

  return (
    <div className="game-list-page d-flex">
      <div className="games-div">
        <div className="search">
          <SearchBar
            setSearchQuery={setSearchQuery}
            totalGames={gamesFiltered.length}
          />
          <Nav
            setGenre={setGenre}
            setPlatform={setPlatform}
            setPublisher={setPublisher}
          />
        </div>

        <div className="games-list">
          {fetching ? (
            <div className="d-flex justify-content-center m-2 mt-5 flex-wrap">
              <div className="card placeholders m-2" aria-hidden="true">
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
              <div className="card placeholders m-2" aria-hidden="true">
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
              <div className="card placeholders m-2" aria-hidden="true">
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap">
                <div className="card placeholders m-2" aria-hidden="true">
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                  </div>
                </div>
                <div className="card placeholders m-2" aria-hidden="true">
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                  </div>
                </div>
                <div className="card placeholders m-2" aria-hidden="true">
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Game cards
            gamesFiltered.map((game, index) => (
              <div
               data-aos="fade-in"
                className="card d-inline-flex justify-content-center m-2 mt-5"
                key={game._id}>
                {/* Game content */}
                <Link to={`/games/${game._id}`}>
                  <img
                    src={game.thumbnail}
                    className="card-img-top thumbnail"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title title">{game.title}</h5>
                  </div>
                </Link>

                {isLoggedIn &&
                currentUser &&
                currentUser.favGames.includes(game._id) ? (
                  <button onClick={() => removeGame(game._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </button>
                ) : isLoggedIn ? (
                  <button onClick={() => addGame(game._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </button>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
