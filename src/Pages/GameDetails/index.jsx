import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from 'react';

export default function GameDetailsPage(props) {
  //write State
  // 1) Store the specific Project inside State
  const [gameDetails, setGameDetails] = useState("");
   
  // Same as Express -> const {gameId} = req.params;
  const {gameId} = useParams();

  // Destructuring
  const {gamesProp} = props;

  useEffect(()=>{
    // Find the game with the id that matches Route Params
    const foundGame = gamesProp.find((oneGame)=>{
        return oneGame.id === gameId;
    })

    // Store it into state, in order to persist Updates
    setGameDetails(foundGame);

  }, [gamesProp])

  return (
    <div>
        {gameDetails && (
            <div>
                <h2>{gameDetails.title}</h2>
                <h3>Tech Stack: {gameDetails.thumbnail}</h3>
                <p>{gameDetails.short_description}</p>
                <Link to="/games-list">Back</Link>
            </div>

            /* project? (<div>
                <h2>{project.name}</h2>
                <h3>Tech Stack: {project.technologies}</h3>
                <p>{project.description}</p>
                <Link to="/projects">Back</Link>
            </div>) : null */
        )}
    </div>
  )
}
