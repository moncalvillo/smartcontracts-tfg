import React, { createContext, useContext, useEffect, useState } from 'react';
import Wrapper from '../components/wrappers/LoginRegisterWrapper';
 import axios from 'axios';
const initialState = {
  user: {},
  accessToken: undefined,
};
 
const UserContext = createContext(initialState);
 
export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(null);
 
  function handleAccessTokenChange() {
    if (accessToken && accessToken !== "") {
      localStorage.setItem('access_token', accessToken);
      axios.get('/server/user', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }).then((res) => {
        setUser(res.data.user);
      }).catch((err) => {
        console.log(err)
      });
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('access_token');
      setUser(null);
    }
  }
 
  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);
  

  
  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>

      {
        !user ? <Wrapper /> : children
      }
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);