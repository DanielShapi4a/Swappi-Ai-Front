import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../../services/constants.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  const getLoggedIn = async () => {
    const loggedInres = await axios.get(`${API_URL}/auth/loggedIn`, { withCredentials: true });
    setUserState(loggedInres.data);
  };
  useEffect(() => {
    getLoggedIn();
  }, []);

  return <AuthContext.Provider value={{ user, setUser: setUserState }}>{children}</AuthContext.Provider>;
};
