import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ironGamesService } from "../../Services/ironGames.service";

function IronEditGamePage() {
  // Write State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game_url, setGame_url] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [uploading, setUploading] = useState(false);


  const { gameId } = useParams();

  const navigate = useNavigate();

  // Have a Side-Effect after initial rendering of component
  useEffect(() => {
    ironGamesService
      .getGame(gameId)
      .then((response) => {
        const oneGame = response.data;
        setTitle(oneGame.title);
        setDescription(oneGame.description);
        setGame_url(oneGame.game_url);
        setLinkedin(oneGame.linkedin);
        setGithub(oneGame.github);
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
      description,
      game_url,
      linkedin,
      github,
      
    };

    // make a PUT request to update the project
    ironGamesService
      .updateGame(gameId, requestBody)
      .then(() => {
        setUploading(false)
        navigate(`/ironhack/games/${gameId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create a delete project function
  const deleteGame = () => {
    ironGamesService
      .deleteGame(gameId)
      .then(() => {
        navigate("/ironhack/games");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-game-page">
      <form onSubmit={handleFormSubmit} className="edit-game-form">
        <div className="btn-title">
          <Link
            className="btn btn-warning back-btn-1"
            to={`/ironhack/games/${gameId}`}>
            Back
          </Link>
          <h3 className="edit-profile-title ih-games">Edit the Game</h3>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="edit-game-genre">
          <label className="form-label edit">Link to the Game</label>
          <input
            className="form-control"
            type="text"
            name="game_url"
            value={game_url}
            onChange={(e) => setGame_url(e.target.value)}
          />
        </div>
        <div className="edit-game-publisher">
          <label className="form-label edit">LinkedIn</label>
          <input
            className="form-control"
            type="text"
            name="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className="edit-game-developer">
          <label className="form-label edit">GitHub</label>
          <input
            className="form-control"
            type="text"
            name="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        

        <div className="edit-games-btn">
          <button className="btn btn-danger delete-ih-loading-game-btn" onClick={deleteGame}>
            Delete Game
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
          </button>
        )
        : (
          <button className="btn btn-warning ih-loading-game-btn" type="submit">
          Edit
        </button>
        )}
          
        </div>
      </form>
    </div>
  );
}

export default IronEditGamePage;
