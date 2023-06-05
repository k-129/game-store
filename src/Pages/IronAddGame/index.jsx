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
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [platform, setPlatform] = useState("");
  const [developer, setDeveloper] = useState(""); 

  // 4) and 5) Steps

  const handleSubmit = (e) =>{
    e.preventDefault();

    const requestBody = {title, description, genre, publisher, platform, developer};

    ironGamesService.createGame(requestBody)
    .then(()=>{
        setTitle("");
        setDescription("");
        setGenre('');
        setPublisher('');
        setPlatform('');
        setDeveloper('');
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

      <label>Genre:</label>
      <input
        type="text"
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <label>Publisher:</label>
      <input
        type="text"
        name="publisher"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />
      <label>Platform:</label>
      <input
        type="text"
        name="platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <label>Developer:</label>
      <input
        type="text"
        name="developer"
        value={developer}
        onChange={(e) => setDeveloper(e.target.value)}
      />
      

      <button type="submit">Add Game</button>
    </form>
  </div>    
  )
}
