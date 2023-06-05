import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import ironGamesService from '../../Services/ironGames.service';

function IronEditGamePage() {
    // Write State 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [game_url, setGame_url] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [imgUrl, setImgUrl] = useState(""); 

    const {gameId} = useParams();

    const navigate = useNavigate();

    // Have a Side-Effect after initial rendering of component
    useEffect(()=>{
      ironGamesService.getGame(gameId)
        .then((response)=>{
            const oneGame = response.data; 
            setTitle(oneGame.title);
            setDescription(oneGame.description);
            setGame_url(oneGame.game_url);
            setLinkedin(oneGame.linkedin);
            setGithub(oneGame.github);
            setImgUrl(oneGame.imgUrl);
        })
        .catch((error)=>{
            console.log(error)
        })

    }, [gameId]);

    // Create a function that Handles Form Submit 
    const handleFormSubmit = (e)=>{
        // prevent the default action of the form => refreshing the page
        e.preventDefault();

      
        const requestBody = {title, description, game_url, linkedin, github, imgUrl};      

        // make a PUT request to update the project
       ironGamesService.updateGame(gameId, requestBody)
             .then(()=>{
                navigate(`/ironhack/games/${gameId}`)
             })
             .catch((error)=>{
                console.log(error)
             })
    }

    // Create a delete project function 
    const deleteGame = () => {
        ironGamesService.deleteGame(gameId)
        .then(()=>{
            navigate('/ironhack/games');
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div className="edit-project-page d-flex justify-content-center align-items-center flex-column">
    <h3>Edit the Game</h3>

    <form onSubmit={handleFormSubmit} className='d-flex flex-column'>
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

      <label>genre:</label>
      <input
        type="text"
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <label>publisher:</label>
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
      

      <button type="submit">Edit</button>
    </form>
    <button onClick={deleteGame}>Delete Game</button>
    <Link to={`/ironhack/games/${gameId}`}>Back to game</Link>

  </div>    
  )
}

export default IronEditGamePage