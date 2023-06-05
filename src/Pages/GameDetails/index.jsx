import {useParams, Link} from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../Context/auth.context';



export default function GameDetailsPage(props) {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [gameDetails, setGameDetails] = useState("");
  const {gameId} = useParams();


const gameInfo = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/games/${gameId}`)
  setGameDetails(response.data)
  } catch (error) {
    console.log(error)
  }
}


  useEffect(()=>{

    gameInfo();

  }, [])

  return (
    <div className="d-flex flex-column">
        {gameDetails && (
            <div className='d-flex flex-column'>
                <h2>{gameDetails.title}</h2>
                <img src={gameDetails.thumbnail}/>
                <p>{gameDetails.short_description}</p>
            </div>
        )}
                {user.admin &&
                <Link to={`/games/edit/${gameId}`}>Edit Game</Link>
                }
                <Link to="/games">Back</Link>


                
    </div>
  )
}
