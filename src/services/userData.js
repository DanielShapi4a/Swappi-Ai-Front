import { API_URL } from "./constants";
import { jwtDecode } from "jwt-decode";
import { setUser } from "./authService";
import { useAuth } from '../pages/contexts/authContext.js';
import axios from "axios";

// userData.js
export async function registerUser(userData) {
  console.log("======START OF REGISTER USER FUNCTION======")
  console.log(JSON.stringify(userData));
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    console.log("Signe-IN response:", result);
    if (response.ok)
    {
      return result;
    }
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    return { success: false, message: 'Unexpected error during sign-in' };
  }
}

export const loginUser = async (email, password, setUser) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const result = response.data; // Access the data object from the response

    console.log("The information received from login is:");
    console.log(result);

    if (response.status === 200) {
      // Update user data in the context
      setUser(result.user);
      return { success: true, user: result.user };
    } else {
      return { success: false, message: result.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    return { success: false, message: 'Error during login' };
  }
};



export async function getUser() {
  try {
    const response = await fetch(`${API_URL}/auth/getuserdatabytoken`, { credentials: "include" });

    if (!response.ok) {
      throw new Error('Error fetching user details');
    }

    const user = await response.json();

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return {
      success: false,
      message: 'Error fetching user details',
    };
  }
}

export async function getUserActiveSells(id) {
  return fetch(`${API_URL}/products/sells/active/${id}`, { credentials: "include" }).then((response) => response.json());
}

export async function getUserArchivedSells() {
  return fetch(`${API_URL}/products/sells/archived`, { credentials: "include" }).then((response) => response.json());
}

export async function getUserWishlist() {
  return fetch(`${API_URL}/products/wishlist/getWishlist`, { credentials: "include" }).then((response) => response.json());
}

export async function editUserProfile(userId, data) {
  return await fetch(`${API_URL}/users/edit/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then(response => response.json());
}


export async function getUserById(id) {
  try {
    const response = await fetch(`${API_URL}/user/getUserById/${id}`, { credentials: "include" });
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user');
  }
}
export async function logoutUser () {
  const response = await axios.get(`${API_URL}/auth/logout`, {withCredentials : true});
}
