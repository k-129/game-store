import { useState, useEffect } from "react";
import gamesService from '../../Services/games.service';

export default function Nav(props) {
  const {setPublisher, setPlatform, setGenre} = props

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [publishers, setPublishers] = useState([]);



  const getAllGenres = () => {
    gamesService
      .getAllGames()
      .then((response) => {
        const uniqueGenres = [...new Set(response.data.map((game) => game.genre))];
        setGenres(uniqueGenres.sort());
      })
      .catch((error) => console.log(error));
  };

  const getAllPlatforms = () => {
    gamesService
      .getAllGames()
      .then((response) => {
        const uniquePlatforms = [...new Set(response.data.map((game) => game.platform))];
        setPlatforms(uniquePlatforms);
      })
      .catch((error) => console.log(error));
  };

  const getAllPublishers = () => {
    gamesService
      .getAllGames()
      .then((response) => {
        const uniquePublishers = [...new Set(response.data.map((game) => game.publisher))];
        setPublishers(uniquePublishers.sort());
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllGenres();
    getAllPlatforms();
    getAllPublishers();
  }, []);

  return (
    <div className="filter-nav">
      <ul className="nav filter-list">
        <div className="selects">
          <div className="genres">
            <select onChange={(e)=>setGenre(e.target.value)} name="genres" id="genres" className="btn genre-box">
              <option className="filter-text" value="" >Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="platforms">
            <select onChange={(e)=>setPlatform(e.target.value)} name="platforms" id="platforms" className="btn genre-box ">
              <option className="filter-text" value="">Platforms</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div className="publishers">
            <select onChange={(e)=>setPublisher(e.target.value)} name="publishers" id="publishers" className="btn genre-box">
              <option className="filter-text" value="">Publishers</option>
              {publishers.map((publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              ))}
            </select>
          </div>
        </div>
      </ul>
    </div>
  );
}
