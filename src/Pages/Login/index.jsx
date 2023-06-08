import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/auth.service";
import { AuthContext } from "../../Context/auth.context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <div className="form-input">
            <label className="login-label login">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="form-input">
            <label className="login-label login">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <button className="signup-btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <p className="login-create">
          Don't have an account?{" "}
          <Link className="login-route1" to={`/signup`}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
