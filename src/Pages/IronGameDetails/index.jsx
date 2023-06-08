import { useParams, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";

export default function IronGameDetailsPage(props) {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [ironGameDetails, setIronGameDetails] = useState("");
  const { gameId } = useParams();

  const gameInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/ironhack/games/${gameId}`
      );
      setIronGameDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gameInfo();
  }, []);

  return (
    <div className="game-page">
      {ironGameDetails && (
        <div className="game-info">
          <h2 className="ih-game-title">{ironGameDetails.title}</h2>
      
        <div className="game-container">
          <img className="game-image" src={ironGameDetails.imgUrl} alt=""/>
          <p className="game-description">{ironGameDetails.description}</p>
        </div>
        
      </div>
      )}
      <div>
      <Link className="btn btn-warning back-btn" to="/ironhack/games">Back to Games</Link>
      {user && user.admin &&
        <Link className="btn btn-warning edit-btn" to={`/ironhack/games/edit/${gameId}`}>Edit Game</Link>
      }
      </div>
    </div>
  );
}
