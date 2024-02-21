import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { API_URL } from './constants';

// Function to verify JWT token
export const verifyToken = (token) => {
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
  const token = getCookie('accessToken');
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
  console.log("HIIIII");
  try {
    const token = getCookie('accessToken');
    if (token) {
      console.log("byeyeeyyeye");

      const response = await axios.post(`${API_URL}/auth/validate-token`,{token: token});
      const userData = response.data; // Assuming user data is returned from the backend
      console.log("UserData after setUser:", userData);
      setUserCallback(userData); // Set user data using the provided callback
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};

export const isAuthenticated = () => {
  const token = getCookie('accessToken');
  if (!token) {
    return false; // No token found
  }

  try {
    // Check if token is expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (decodedToken.exp < currentTime) {
      // Token expired, remove from cookies
      // Note: It's not possible to directly remove a cookie from the client-side, so it's just set to expire immediately
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return false; // Token expired
    }

    return true; // User is authenticated
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return false; // Error decoding token
  }
};

// Function to get cookie value by name
const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
