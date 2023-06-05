import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GamepadIcon from "../../assets/images/gamepad-svgrepo-com.svg";
import { AuthContext } from '../../Context/auth.context';
import axios from 'axios';

export default function NavBar(props) {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/${user._id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.log('Error fetching user details:', error);      
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, []);


  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={GamepadIcon} alt="Gamepad Icon" className="brand-icon" />
          <h3 className="nav-title">Game Store</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/games">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ironhack/games">
                Ironhack Games
              </Link>
            </li>
            {user && user.admin && 
              <li className="nav-item">
                <Link className="nav-link" to="/add-game">
                  Add Game
                </Link>
              </li>
            }
          </ul>
          <div className="profile-link">
            
            { isLoggedIn ?
              <Link to={`/profile/${user._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="black"
                  className="bi bi-person-circle profile-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </Link>
              :
              <Link to={`/login`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="black"
                  className="bi bi-person-circle profile-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
