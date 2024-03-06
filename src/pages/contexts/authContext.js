<<<<<<< HEAD
 import axios from 'axios';
import React, { createContext, useContext, useEffect, useState} from 'react';
import { API_URL } from "../../services/constants.js";
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/constants';
import { getCookie, isAuthenticated } from '../../services/authService'; 
>>>>>>> e3dffd06cd5055e1668673bf9ae1a9e13bdab31d

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  const getLoggedIn = async () => {
    const loggedInres = await axios.get(`${API_URL}/auth/loggedIn`, {withCredentials : true});
    setUserState(loggedInres.data);
  }
  useEffect(() =>{
    getLoggedIn();
  }, [])
=======
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");
      try {
        const token = getCookie('accessToken');
        if (token) {
          const response = await axios.post(`${API_URL}/auth/validate-token`, { token }); 
          const userData = response.data;
          setUser(userData); // Use setUser directly
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchUserData();
    } else {
      setLoading(false);
    }

    return () => {
      setUser(null);
    };
  }, []);
>>>>>>> e3dffd06cd5055e1668673bf9ae1a9e13bdab31d

  return (
    <AuthContext.Provider value={{ user, setUser }}> {/* Use destructured setUser */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
