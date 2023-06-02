import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import gameService from '../../Services/games.service';

function EditProjectPage() {
    // Write State 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
            setDescription(oneGame.short_description);
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

      
        const requestBody = {title, description, genre, publisher, platform, developer};      

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
    <div className="edit-project-page">
    <h3>Edit the Project</h3>

    <form onSubmit={handleFormSubmit}>
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
    <button onClick={deleteGame}>Delete Project</button>
    <Link to={`/games/${gameId}`}>Edit Game</Link>

  </div>    
  )
}

export default EditProjectPage