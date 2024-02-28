import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/constants';
import { getCookie, isAuthenticated } from '../../services/authService'; 

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider value={{ user, setUser }}> {/* Use destructured setUser */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
