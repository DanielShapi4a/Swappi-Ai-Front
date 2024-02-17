import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { API_URL } from './constants';

// Function to verify JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    // Token verification failed
    return null;
  }
};

// Function to check if the user is logged in
export const checkLoggedIn = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // Verify token validity
    const decoded = verifyToken(token);
    if (decoded) {
      // Token is valid, user is logged in
      return true;
    }
  }
  return false;
};

// Function to fetch user data from backend and set in context state
export const setUser = async (setUserCallback) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data; // Assuming user data is returned from the backend
      setUserCallback(userData); // Set user data using the provided callback
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return false; // No token found
  }

  try {
    // Check if token is expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('accessToken');
      return false; // Token expired
    }

    return true; // User is authenticated
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return false; // Error decoding token
  }
};
