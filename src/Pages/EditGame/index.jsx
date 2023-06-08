import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import gameService from '../../Services/games.service';

export default function EditGameDetailsPage() {
    // Write State 
    const [title, setTitle] = useState("");
    const [short_description, setShort_description] = useState("");
    const [genre, setGenre] = useState("");
    const [publisher, setPublisher] = useState("");
    const [platform, setPlatform] = useState("");
    const [developer, setDeveloper] = useState("");

    const {gameId} = useParams();

    const navigate = useNavigate();

    // Have a Side-Effect after initial rendering of component
    useEffect(()=>{
        gameService.getGame(gameId)
        .then((response)=>{
            const oneGame = response.data; 
            setTitle(oneGame.title);
            setShort_description(oneGame.short_description);
            setGenre(oneGame.genre);
            setPublisher(oneGame.publisher);
            setPlatform(oneGame.platform);
            setDeveloper(oneGame.developer);
        })
        .catch((error)=>{
            console.log(error)
        })

    }, [gameId]);

    // Create a function that Handles Form Submit 
    const handleFormSubmit = (e)=>{
        // prevent the default action of the form => refreshing the page
        e.preventDefault();

      
        const requestBody = {title, short_description, genre, publisher, platform, developer};      

        // make a PUT request to update the project
       gameService.updateGame(gameId, requestBody)
             .then(()=>{
                navigate(`/games/${gameId}`)
             })
             .catch((error)=>{
                console.log(error)
             })
    }

    // Create a delete project function 
    const deleteGame = () => {
        gameService.deleteGame(gameId)
        .then(()=>{
            navigate('/games');
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div className="edit-game-page d-flex justify-content-center align-items-center flex-column">
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
        value={short_description}
        onChange={(e) => setShort_description(e.target.value)}
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
    <Link to={`/games/${gameId}`}>Back to game</Link>

  </div>    
  )
}
