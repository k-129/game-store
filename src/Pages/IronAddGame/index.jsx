import {useState} from 'react';

import ironGamesService from '../../Services/ironGames.service';

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

  // 4) and 5) Steps

  const handleSubmit = (e) =>{
    e.preventDefault();

    const requestBody = {title, description, game_url, linkedin, github, imgUrl};

    ironGamesService.createGame(requestBody)
    .then(()=>{
        setTitle("");
        setDescription("");
        setGame_url('');
        setLinkedin('');
        setGithub('');
        setImgUrl('');
    })
    .catch((error)=>console.log(error));
  }


  return (
    <div className="edit-project-page">
    <h3>Add New Game</h3>

    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Game URL:</label>
      <input
        type="text"
        name="game_url"
        value={game_url}
        onChange={(e) => setGame_url(e.target.value)}
      />
      <label>Linked In:</label>
      <input
        type="text"
        name="linkedin"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />
      <label>GitHub:</label>
      <input
        type="text"
        name="github"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <label>Image:</label>
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      

      <button type="submit">Add Game</button>
    </form>
  </div>    
  )
}
