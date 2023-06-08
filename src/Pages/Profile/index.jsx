import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import chico from "../../assets/images/chico.png";

export default function ProfilePage() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <aside className="profile-info">
        {/* <img className="user-pic" src="" alt="profile-pic"/> */}
        <div className="user-info">
          <div className="picture-container">
            <img className="profile-pic" src={user.imgUrl} alt="Your Image" />
          </div>

          <h2 className="user-name">
            Hey {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
          </h2>
          <p className="user-email">{user.email}</p>

          <p className="about-me h4">About Me: </p>
          <p className="about-me lead">{user.about_me}</p>
        </div>
        <div className="user-links">
          <Link
            className="edit-profile-btn btn"
            to={`/profile/edit/${user._id}`}>
            Edit
          </Link>
          <button className="btn logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </aside>

      <div className="bucket-list">
        <h1 className="display-5">Favorite Games</h1>
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
              <button className=" remove-button" onClick={() => removeGame(game._id)}>
                Remove
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
