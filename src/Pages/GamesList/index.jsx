import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import gamesService from "../../Services/games.service";
import Nav from "../../Components/Nav";
import "../../App.css";
import SearchBar from "../../Components/SearchBar";
import FavoriteRoute from "../Favorites";
import { AuthContext } from "../../Context/auth.context";

export default function GamesListPage() {
  const [games, setGames] = useState([]);
  const [gamesFiltered, setGamesFiltered] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [publisher, setPublisher] = useState("");

  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const userId = useContext(AuthContext);



  // function that gets projects via axios
  const getAllGames = () => {
    gamesService
      .getAllGames()
      .then((response) => {
        setGames(response.data);
        setGamesFiltered(response.data);
        setFetching(false);
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
    } else if(searchQuery === ""){
      getAllGames();
    }
  };

  useEffect(() => {
    getSearchGames();
  }, [searchQuery]);

  // setting a side-effect after initial rendering of component that is
  // calling getAllGames function
  useEffect(() => {
    getAllGames();
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
 

  const handleFavoriteToggle = (gameId) => {
    setGamesFiltered((prevGames) => {
      return prevGames.map((game) => {
        if (game._id === gameId) {
          return { ...game, isFavorite: !game.isFavorite };
        }
        return game;
      });
    });
  };


  return (
    <div className="game-list-page d-flex">
      <div className="games-div">
        <div className="search">
        <SearchBar setSearchQuery={setSearchQuery} totalGames={gamesFiltered.length} />
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
                className="card d-inline-flex justify-content-center m-2 mt-5"
                key={game._id}
              >
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
                {isLoggedIn && (
                  <FavoriteRoute
                    user={user}
                    gameId={game._id}
                    isFavorite={game.isFavorite}
                    userId={user.userId}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}