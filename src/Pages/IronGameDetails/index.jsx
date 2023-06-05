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
    <div className="d-flex flex-column">
      {ironGameDetails && (
        <div className="d-flex flex-column">
          <h2>{ironGameDetails.title}</h2>
          <img src={ironGameDetails.imgUrl} />
          <p>{ironGameDetails.description}</p>
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
