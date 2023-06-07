import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoriteRoute = ({ user, gameId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/${user._id}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

    userInfo &&
      userInfo.favGames.map((userGame) => {
        console.log(userInfo);
        console.log(gameId);
        if (userGame._id == gameId) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      });
  }, []);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/remove-favorites/${
            user._id
          }/${gameId}`
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/add-favorites/${
            user._id
          }/${gameId}`
        );
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default FavoriteRoute;
