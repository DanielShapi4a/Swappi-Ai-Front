import { API_URL } from "./constants";
import axios from "axios";

// export async function getAll(page = 1, category = null, query = '') {
//   let url = `${API_URL}/tickets?page=${page}`;

//   if (query) {
//     url += `&search=${query}`;
//   } else if (category && category !== 'all') {
//     url = `${API_URL}/tickets/${category}?page=${page}`;
//   }

//   try {
//     const response = await fetch(url, { credentials: 'include' });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }
export async function HandleGetAllTickets() {
  try {
    const response = await fetch(`${API_URL}/tickets/`, { credentials: "include" });
    const data = await response.json();
    console.log("all ids fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    throw error;
  }
}

export async function getCategoryNames() {
  try {
    const response = await fetch(`${API_URL}/categories/getAllCategories`, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching category names:", error);
    throw error;
  }
}

export async function getDataForCategoryByName(name) {
  try {
    const response = await fetch(`${API_URL}/tickets/ticketsByCategory/${name}`, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

export async function getAllTicketsByUserID(id) {
  try {
    const response = await axios.get(`${API_URL}/tickets/getTicketsByUser/${id}`, { credentials: "include" });
    const data = response.data;
    console.log("all ids fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all tickets by userId:", error);
    throw error;
  }
}

export async function getSpecific(id) {
  const response = await fetch(`${API_URL}/tickets/getTicket/${id}`, { credentials: "include" });
  const data = await response.json();
  console.log("getSpecific data:", data);
  return data;
}

export async function getRandomTicket() {
  return (await fetch(`${API_URL}/tickets/random`)).json();
}

export const createTicket = async (user, ticketData) => {
  try {
    const res = await axios.post(`${API_URL}/tickets/createNewTicket/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      data: ticketData,
    });
    if (res.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const updateTicket = async (user, ticketId, ticketData) => {
  ticketData = {...ticketData,"seller":user._id}
  try {
    const res = await axios.put(`${API_URL}/tickets/updateTicket/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      data: ticketData,
    });
    if (res.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export async function activateSell(id) {
  return (await fetch(`${API_URL}/tickets/enable/${id}`)).json();
}

export async function archiveSell(id) {
  return (await fetch(`${API_URL}/tickets/archive/${id}`)).json();
}

export async function wishTicket(id) {
  return (await fetch(`${API_URL}/tickets/wish/${id}`, { credentials: "include" })).json();
}
