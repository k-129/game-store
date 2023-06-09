import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gameService from "../../Services/games.service";

export default function EditGameDetailsPage() {
  // Write State
  const [title, setTitle] = useState("");
  const [short_description, setShort_description] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [platform, setPlatform] = useState("");
  const [developer, setDeveloper] = useState("");
  const [uploading, setUploading] = useState(false);


  const { gameId } = useParams();

  const navigate = useNavigate();

  // Have a Side-Effect after initial rendering of component
  useEffect(() => {
    gameService
      .getGame(gameId)
      .then((response) => {
        const oneGame = response.data;
        setTitle(oneGame.title);
        setShort_description(oneGame.short_description);
        setGenre(oneGame.genre);
        setPublisher(oneGame.publisher);
        setPlatform(oneGame.platform);
        setDeveloper(oneGame.developer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gameId]);

  // Create a function that Handles Form Submit
  const handleFormSubmit = (e) => {
    // prevent the default action of the form => refreshing the page
    e.preventDefault();
    setUploading(true);

    const requestBody = {
      title,
      short_description,
      genre,
      publisher,
      platform,
      developer,
    };
    

    // make a PUT request to update the project
    gameService
    .updateGame(gameId, requestBody)
    .then(() => {
        setUploading(false)
        
        navigate(`/games/${gameId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create a delete project function
  const deleteGame = () => {
    gameService
      .deleteGame(gameId)
      .then(() => {
        navigate("/games");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-game-page">
      <form onSubmit={handleFormSubmit} className="edit-game-form">
      <div className="btn-title">
      <Link className="btn btn-warning back-btn-1" to={`/games/${gameId}`}>
            Back
          </Link>
        <h3 className="edit-profile-title">Edit the Game</h3>
        </div>
        <div className="edit-game-title">
          <label className="form-label edit">Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="edit-game-description">
          <label className="form-label edit">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={short_description}
            onChange={(e) => setShort_description(e.target.value)}
          />
        </div>
        <div className="edit-game-genre">
          <label className="form-label edit">Genre</label>
          <input
            className="form-control"
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="edit-game-publisher">
          <label className="form-label edit">Publisher</label>
          <input
            className="form-control"
            type="text"
            name="publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="edit-game-platform">
          <label className="form-label edit">Platform</label>
          <input
            className="form-control"
            type="text"
            name="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </div>
        <div className="edit-game-developer">
          <label className="form-label edit">Developer</label>
          <input
            className="form-control"
            type="text"
            name="developer"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
          />
        </div>

        <div className="edit-games-btn">
          <button className="btn btn-danger  delete- ih-loading-game-btn" onClick={deleteGame}>
            Delete
          </button>
      {uploading ? (
        <button
            className="btn btn-warning loading-game-btn"
            type="button"
            disabled>
            <span
              className="spinner-grow spinner-grow-sm "
              role="status"
              aria-hidden="true"></span>
            Loading...
          </button>)
          :(
        <button className="btn btn-warning edit-game-btn ih-loading-game-btn" type="submit">
          Edit
        </button>)
        }

    
        </div>
      </form>
    </div>
  );
}
