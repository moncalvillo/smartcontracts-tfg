import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import LoginRegisterWrapper from '../organism/LoginRegisterWrapper';
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
      console.log(accessToken);
      localStorage.setItem('access_token', accessToken);
      const {user} = jwtDecode(accessToken);
      console.log(user)
      setUser(user)
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
        !user ? <LoginRegisterWrapper /> : children
      }
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);