import React, { createContext, useState } from "react";
import { tokenKey } from "../data/constants/storage_keys";

export const authContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(tokenKey));

  function setUserToken(userToken) {
    localStorage.setItem(tokenKey, userToken);
    setToken(userToken);
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    setToken(null);
  }

  return (
    <authContext.Provider value={{ token, setToken: setUserToken, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
