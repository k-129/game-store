import {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../Services/auth.service';

export default function SignUpPage() {
    const [email,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    //handle change of inputs
    const handleEmail = (e) =>{setEmail(e.target.value)};
    const handlePassword = (e) =>{setPassword(e.target.value)};
    const handleName = (e) =>{setName(e.target.value)};

    const handleSignupSubmit = (e) =>{
        e.preventDefault();

        const requestBody = {name, email, password};

        authService.signup(requestBody)
          .then((response)=>{
            navigate('/login')
          })
          .catch((error)=>{
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    }



    return (
    <div className="signup-page">
      <h1>Sign Up</h1>
 
      <form onSubmit={handleSignupSubmit}>
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
        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />
    </div>
    <div>
        <button type="submit">Sign Up</button>
    </div>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
  </div>
  )
}
