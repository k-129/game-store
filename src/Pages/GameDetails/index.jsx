import {useParams, Link} from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../Context/auth.context';
import gamesService from '../../Services/games.service';


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
    <div className="game-page">
        {gameDetails && (
          <div className='game-info'>
            <div className="game-container">
                <h2 className="game-title">{gameDetails.title}</h2>
                <img className="game-image" src={gameDetails.thumbnail}/>
                <p className="game-description">{gameDetails.short_description}</p>
                <hr/>
                <div className="game-info-container">
                <div className="main-info">
                    <p>Genre: {gameDetails.genre}</p>
                    <p>Publisher: {gameDetails.publisher}</p>
                    <p>Developer: {gameDetails.developer}</p>
                </div>
                <div className="main-info">
                    <p>Platform: {gameDetails.platform}</p>
                    <Link className="game-link" to={gameDetails.game_url}>Play Game</Link>
                    
                </div>
                </div>
            </div>
          </div>
        )}
        <div>
                <Link className="btn btn-warning back-btn" to="/games">Back to Games</Link>
                
                {user && user.admin &&
                <Link className="btn btn-warning edit-btn" to={`/games/edit/${gameId}`}>Edit Game</Link>
                }
        </div>

                
    </div>
  )
}
