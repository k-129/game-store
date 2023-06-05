import { useParams, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";

export default function IronGameDetailsPage(props) {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [gameDetails, setGameDetails] = useState("");
  const { gameId } = useParams();

  const gameInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/ironhack/games/${gameId}`
      );
      setGameDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gameInfo();
  }, []);

  return (
    <div className="d-flex flex-column">
      {gameDetails && (
        <div className="d-flex flex-column">
          <h2>{gameDetails.title}</h2>
          <img src={gameDetails.thumbnail} />
          <p>{gameDetails.short_description}</p>
        </div>
      )}
      {user && user.admin ? (
        <Link to={`/ironhack/games/edit/${gameId}`}>Edit Game</Link>
      ) : (
        <p></p>
      )}
      <Link to="/ironhack/games">Back</Link>
    </div>
  );
}
