import { useState } from "react";
import axios from "axios";
import { ironGamesService } from "../../Services/ironGames.service";
import { useNavigate } from "react-router-dom";

// STEPS:
// 1) Create a Form;
// 2) Connect the input values with state values;
// 3) Create handle functions to handle change of inputs;
// 4) Create function that handles form submit
// 5) Inside this function, create a post request via Axios.

export default function IronAddGame(props) {
  // 2) Write State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game_url, setGame_url] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  // Fileupload
  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append("imgUrl", e.target.files[0]);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/upload`,
        uploadData
      );
      setImgUrl(response.data.fileUrl);
      setUploading(false);
      console.log(response.data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      game_url,
      linkedin,
      github,
      imgUrl,
    };

    ironGamesService
      .createGame(requestBody)
      .then(() => {
        setTitle("");
        setDescription("");
        setGame_url("");
        setLinkedin("");
        setGithub("");
        setImgUrl("");
        navigate("/ironhack/games");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="edit-game-page">
    

      <h3>Add New Game</h3>

      <form className="add-game-form" onSubmit={handleSubmit}>
      <div>
        <label className="form-label edit">Title</label>
        <input className="form-control"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div>

        <label className="form-label edit">Description</label>
        <textarea className="form-control"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div>
        <label className="form-label edit">Game URL</label>
        <input className="form-control"
          type="text"
          name="game_url"
          value={game_url}
          onChange={(e) => setGame_url(e.target.value)}
        />
        </div>
        <div>
        <label className="form-label edit">LinkedIn</label>
        <input className="form-control"
          type="text"
          name="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        </div>
        <div>
        <label className="form-label edit">GitHub</label>
        <input className="form-control"
          type="text"
          name="github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        </div>
        <div>

        
        <label className="form-label edit">Image</label>

        <input className="form-control" type="file" onChange={(e) => handleFileUpload(e)} />
        {uploading ? (
          <p>Wait for the image to upload</p>
        ) : (
          <button type="submit">Add Game</button>
        )}
        </div>
      </form>
      </div>

  );
}
