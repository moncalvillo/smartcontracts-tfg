import React, { createContext, useContext, useEffect, useState } from 'react';
 
function getCurrentUser(accessToken) {
  if (accessToken  === 'accessToken') {
    return {
      name: 'Thomas',
    };
  }
}
 
const initialState = {
  user: {},
  accessToken: undefined,
};
 
const UserContext = createContext(initialState);
 
export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState({});
 
  function handleAccessTokenChange() {
    if (!user.name && accessToken) {
      localStorage.setItem('access_token', accessToken);
      const user = getCurrentUser(accessToken);
      setUser(user);
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('access_token');
      setUser({});
    }
  }
 
  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);
 
  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);