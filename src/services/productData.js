import { API_URL } from "./constants";
import axios from "axios";

// fucntion to get gell all the available tickets from the DB
export async function HandleGetAllTickets() {
  try {
    const response = await fetch(`${API_URL}/tickets/`, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    throw error;
  }
}

// function to get the current available categories
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

// fucntion to get the tickets for the category selected
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

// fucntion to get all the users ticket via his id
export async function getAllTicketsByUserID(id) {
  try {
    const response = await axios.get(`${API_URL}/tickets/getTicketsByUser/${id}`, { credentials: "include" });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching all tickets by userId:", error);
    throw error;
  }
}

// fucntion to get a spesific ticket via its id
export async function getSpecific(id) {
  const response = await fetch(`${API_URL}/tickets/getTicket/${id}`, { credentials: "include" });
  const data = await response.json();
  return data;
}

// funciton to create a ticket with its data via user ID
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

// function to update the tickets data via tickets ID
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

// function to search for users input in the navbar
export const searchTicket = async (searchString) => {
  try{
    const response = await axios.get(`${API_URL}/tickets/search/`, {
      params: { q: searchString }
    });
    return response.data;
  } catch(error){
    console.log(error.response.data);
    return ;
  }
};


// export async function activateSell(id) {
//   return (await fetch(`${API_URL}/tickets/enable/${id}`)).json();
// }

// export async function wishTicket(id) {
//   return (await fetch(`${API_URL}/tickets/wish/${id}`, { credentials: "include" })).json();
// }
