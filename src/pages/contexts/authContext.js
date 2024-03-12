import axios from 'axios';
import React, { createContext, useContext, useEffect, useState} from 'react';
import { API_URL } from "../../services/constants.js";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const getLoggedIn = async () => {
    try {
      const loggedInres = await axios.get(`${API_URL}/auth/getUser`, {withCredentials : true});

      setUser(loggedInres.data); // Use setUser instead of setUserState
    } catch (error) {
      console.error("Error fetching logged in user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
