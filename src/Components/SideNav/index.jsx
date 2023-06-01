import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gamesService from '../../Services/games.service';

export default function SideNav() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const getAllGenres = () => {
    gamesService
      .getAllGames()
      .then((response) => {
        const uniqueGenres = [...new Set(response.data.map((game) => game.genre))];
        setGenres(uniqueGenres);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="aside">
      <aside className="d-flex align-items-start" key="all-games">
        <Link to={`/games`} onClick={() => handleGenreClick(null)}>
          <button className={`genre-link button ${selectedGenre === null ? 'active' : ''}`}>All Games</button>
        </Link>
      </aside>

      {genres.map((genre) => (
        <aside className="d-flex align-items-start " key={genre}>
          <Link to={`/games/${genre}`} onClick={() => handleGenreClick(genre)}>
            <button className={`genre-link button ${selectedGenre === genre ? 'active' : ''}`}>{genre}</button>
          </Link>
        </aside>
      ))}
    </div>
  );
}
