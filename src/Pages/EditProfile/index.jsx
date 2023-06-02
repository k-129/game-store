import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import authService from '../../Services/auth.service';


function EditProfilePage() {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const navigate = useNavigate();
  const getToken = localStorage.getItem("authToken");
  const { logoutUser, user } = useContext(AuthContext);


  const getUser = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/edit/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      } 
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setAboutMe(response.data.bio);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = (userId) => {
    axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/edit/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    logoutUser();
    navigate('/');
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAboutMe = (e) => {
    setAboutMe(e.target.value);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/${user._id}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        
        navigate(`/profile/${userId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editProfileBody">
      <form onSubmit={handleSubmit} className="editProfileForm">
        <h4>Edit your profile</h4>
        <div className="deleteProfileBtnDiv">
          <button
            onClick={() => deleteUser(userId)}
            className="deleteProfileBtn"
          >
            Delete profile
          </button>
        </div>
        <div className="editProfileFormInnerDiv">
          <div className="editProfileFormInfoDiv1">
            <label htmlFor="name">Name*:</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />

            <label htmlFor="aboutMe">Bio*</label>
            <textarea
              name="aboutMe"
              cols="30"
              rows="7"
              value={aboutMe}
              onChange={handleAboutMe}
            ></textarea>


          </div>

        </div>

        <button type="submit" className="editProfileSubmitBtn">
          Edit profile
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;