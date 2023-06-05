import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/auth.context';
import axios from 'axios';

export default function ProfilePage() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/${user._id}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <aside className="profile-info">
        {/* <img className="user-pic" src="" alt="profile-pic"/> */}
        <div className="user-info">
          <h3 className="user-name">User Name: {userInfo.name}</h3>
          <p className="user-email">User email: {userInfo.email}</p>
          <p className="about-me">About Me: {userInfo.about_me}</p>
        </div>
        <div className="user-links">
          <Link to={`/profile/edit/${user._id}`}>Edit</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      </aside>

      <div className="bucket-list">
        cards for bucket list
      </div>
    </div>
  );
}
