import {useState, useContext} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../Services/auth.service';
import {AuthContext} from '../../Context/auth.context'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const { storeToken, authenticateUser } = useContext(AuthContext);

    
    const handleEmail = (e) =>{setEmail(e.target.value)};
    const handlePassword = (e) =>{setPassword(e.target.value)};

    const handleLoginSubmit = (e) =>{
        e.preventDefault();

        const requestBody = {email, password};

        authService.login(requestBody)
          .then((response)=>{
            storeToken(response.data.authToken)
            authenticateUser()
            navigate("/")
          })
          .catch((error)=>{
            const errorDescription = error;
            setErrorMessage(errorDescription);
          })
    }


  return (
    <div className="login-page">
    <h1>Login</h1>

    <form onSubmit={handleLoginSubmit}>
    <div>
      <label>Email:</label>
      <input 
        type="email"
        name="email"
        value={email}
        onChange={handleEmail}
      />
   </div>
   <div>
      <label>Password:</label>
      <input 
        type="password"
        name="password"
        value={password}
        onChange={handlePassword}
      />
  </div>
  <div>
      <button type="submit">Login</button>
  </div>
    </form>
    <Link to={`/signup`}>Sign Up</Link>

    { errorMessage && <p className="error-message">{errorMessage}</p> }
</div>

  )
}