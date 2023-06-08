import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import authService from "../../Services/auth.service";

function EditProfilePage() {
  const { logoutUser, user } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [about_me, setAbout_me] = useState(user.about_me);
  const [imgUrl, setImgUrl] = useState(user.imgUrl);
  const navigate = useNavigate();
  const getToken = localStorage.getItem("authToken");
  const [uploading, setUploading] = useState(false);

  const getUser = async () => {
    try {
      let response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/edit/${
          user._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setAbout_me(response.data.bio);
      setImgUrl(response.data.imgUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = () => {
    axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    logoutUser();
    navigate("/");
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

  const handleAbout_me = (e) => {
    setAbout_me(e.target.value);
  };

  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append("imgUrl", e.target.files[0]);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/upload`,
        uploadData
      );
      setImgUrl(response.data.fileUrl);
      setUploading(false);
      console.log(response.data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name,
      email,
      about_me,
      imgUrl,
    };

    axios
      .put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/profile/edit/${
          user._id
        }`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then(() => {
        navigate(`/profile/${user._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editProfileBody">
      <form onSubmit={handleSubmit} className="editProfileForm">
        <h4>Edit your profile {name}</h4>
        <div className="deleteProfileBtnDiv">
          <button
            onClick={() => deleteUser(user._id)}
            className="deleteProfileBtn">
            Delete profile
          </button>
        </div>
        <div className="editProfileFormInnerDiv">
          <div className="editProfileFormInfoDiv1">
            <label htmlFor="name">Name*:</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder={name}
              onChange={handleName}
            />

            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder={email}
              onChange={handleEmail}
            />

            <label htmlFor="about_me">Bio*</label>
            <textarea
              name="about_me"
              cols="30"
              rows="7"
              value={about_me}
              placeholder={about_me}
              onChange={handleAbout_me}></textarea>

            <label htmlFor="imgUrl">Image*</label>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
          </div>
          {uploading ? (
            <button className="btn btn-warning" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <button type="submit" className="editProfileSubmitBtn">
              Edit profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
