import React, {useState, useEffect} from 'react';
import axios from 'axios';
import authService from '../Services/auth.service';

//creates react context with shareable state data
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) =>{
        localStorage.setItem('authToken', token)
    }

    const authenticateUser = ()=>{
      const   storeToken = localStorage.getItem
      ('authToken');
      if(storeToken){
      authService.verify()
        .then((response)=>{
          setIsLoggedIn(true);
          setLoading(false);
          setUser(null);
        })
        .catch((error)=>{
          setIsLoggedIn(false);
          setLoading(true);
          setUser(null);
        })
      }else{
        setIsLoggedIn(false);
          setLoading(false);
          setUser(null);
      }
      
    }

    const removeToken= ()=>{
      
    }
  return (
    <AuthContext.Provider value={{storeToken}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default {AuthContext, AuthProviderWrapper}