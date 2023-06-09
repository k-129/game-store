import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import chico from "../../assets/images/chico.png";

export default function ProfilePage() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
const pic ='https://res.cloudinary.com/ddruhfcq3/image/upload/v1683806116/movie-project/lgelmuytljncantxmjzd.jpg';

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
  }, []);

  const removeGame = async (gameId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/remove-favorites/${
          user._id
        }/${gameId}`
      );

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        favGames: prevUserInfo.favGames.filter((game) => game._id !== gameId),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!userInfo) {
    return (
      <div class="spinner-border text-white" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      );
  }

  return (
    <div className="profile">
      <aside className="profile-info">
        {/* <img className="user-pic" src="" alt="profile-pic"/> */}
        <div className="user-info">
          <div className="picture-container">
            <img
              className="profile-pic"
              src={userInfo.imgUrl.length >= 1 ? (userInfo.imgUrl):(pic)}
              alt="Your Image"
            />
          </div>

          <h2 className="user-name">
            Hey {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}
            !
          </h2>
          <p className="user-email">{userInfo.email}</p>

          <p className="about-me h4">About Me: </p>
          <p className="about-me lead">{userInfo.about_me}</p>
        </div>
        <div className="user-links">
          <Link
            className="edit-profile-btn btn"
            to={`/profile/edit/${userInfo._id}`}>
            Edit
          </Link>
          <button className="btn logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </aside>

      <div className="bucket-list">
        <h1 className="display-5 fav-game">Favorite Games</h1>
        {userInfo &&
          userInfo.favGames.map((game) => (
            <div
              className="card d-inline-flex justify-content-center m-2 mt-5"
              key={game._id}>
              <Link to={`/games/${game._id}`}>
                <img
                  src={game.thumbnail}
                  className="card-img-top thumbnail"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title fav-title">{game.title}</h5>
                </div>
              </Link>
              <button
                className=" remove-button"
                onClick={() => removeGame(game._id)}>
                Remove
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
