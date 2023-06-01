import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";

export default function GameDetailsPage(props) {
  //write State
  // 1) Store the specific Project inside State
  const [gameDetails, setGameDetails] = useState("");
   
  // Same as Express -> const {gameId} = req.params;
  const {gameId} = useParams();


const gameInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:5005/api/games/${gameId}`)
  setGameDetails(response.data)
  console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}


  // Destructuring
  const {gamesProp} = props;

  useEffect(()=>{
    // Find the game with the id that matches Route Params
    

    // Store it into state, in order to persist Updates
    gameInfo();

  }, [])

  return (
    <div>
        {gameDetails && (
            <div>
                <h2>{gameDetails.title}</h2>
                <img src={gameDetails.thumbnail}/>
                <p>{gameDetails.short_description}</p>
                <Link to="/games">Back</Link>
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
