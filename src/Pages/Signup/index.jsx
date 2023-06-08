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
    <div className='sign-up-form'>
      <h1 className='signup-title'>Sign Up</h1>
 
      <form onSubmit={handleSignupSubmit}>
      <div className='form-input'>
        <label className='signup-label signup'>Email</label>
        <input 

className="form-control"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
     </div>
     <div className='form-input'>
        <label className='signup-label signup'>Password</label>
        <input 

            className="form-control"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
    </div>
    <div className='form-input'>
        <label className='signup-label signup'>Name</label>
        <input 
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />
    </div>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    <div>
        <button className='signup-btn' type="submit">Sign Up</button>
    </div>
      </form>
 
 
      <p className='login-route'>Already have account? <Link className='login-route1' to={"/login"}>Login</Link></p>
      
    </div>
  </div>
  )
}
