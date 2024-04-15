// userData.js

import { API_URL } from "./constants";
import axios from "axios";

// userData.js
export async function registerUser(userData) {
  console.log("======START OF REGISTER USER FUNCTION======");
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
    if (response.ok) {
      return result;
    }
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    return { success: false, message: "Unexpected error during sign-in" };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      // Successful login
      return {
        success: true,
        // accessToken: result.accessToken,
        // refreshToken: result.refreshToken,
        user: result.user,
      };
    } else {
      // Failed login
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }
  } catch (error) {
    // Error during fetch
    console.error("Error during login:", error.message);
    return {
      success: false,
      message: "Error during login",
    };
  }
}

export async function getUser() {
  try {
    const response = await fetch(`${API_URL}/auth/getuserdatabytoken`, { credentials: "include" });

    if (!response.ok) {
      throw new Error("Error fetching user details");
    }

    const user = await response.json();

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return {
      success: false,
      message: "Error fetching user details",
    };
  }
}

export async function getUserActiveSells(id) {
  return fetch(`${API_URL}/products/sells/active/${id}`, { credentials: "include" }).then((response) =>
    response.json()
  );
}

export async function getUserArchivedSells() {
  return fetch(`${API_URL}/products/sells/archived`, { credentials: "include" }).then((response) => response.json());
}

export async function getUserWishlist() {
  return fetch(`${API_URL}/products/wishlist/getWishlist`, { credentials: "include" }).then((response) =>
    response.json()
  );
}

export async function editUserProfile(id, data) {
  return await fetch(`${API_URL}/user/edit-profile/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).json();
}

export async function getUserById(id) {
  try {
    const response = await fetch(`${API_URL}/user/getUserById/${id}`, { credentials: "include" });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
  }
}
export async function logoutUser() {
  const response = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
}
