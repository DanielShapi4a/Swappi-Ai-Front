import React, { createContext, useContext, useState, useEffect } from 'react';
import { setUser, isAuthenticated } from '../../services/authService'; // Adjust the path accordingly

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated()) {
        
        setUser(setUserState); // Fetch user data and set it in the state
      }
    };

    fetchUserData(); // Fetch user data when the component mounts

    // Clean-up function to prevent memory leaks
    return () => {
      setUserState(null); // Reset user state on unmount
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <AuthContext.Provider value={{ user, setUser: setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};
