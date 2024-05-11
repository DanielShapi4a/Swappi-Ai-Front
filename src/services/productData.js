import { API_URL } from "./constants";

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
    console.log("Trying to fetch from front-end:", name);
    const response = await fetch(`${API_URL}/tickets/ticketsByCategory/${name}`, { credentials: "include" });
    const data = await response.json();
    console.log("Data for the spesific wanted category = ", name,":", data);
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}


export async function getSpecific(id) {
  const response = await fetch(`${API_URL}/tickets/getTicket/${id}`, { credentials: "include" });
  const data = await response.json();
  console.log('getSpecific data:', data);
  return data;
}


export async function getRandomTicket() {
  return (await fetch(`${API_URL}/tickets/random`)).json();
}

export async function createTicket(product) {
  return (
    await fetch(`${API_URL}/tickets/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product),
    })
  ).json();
}

export async function editTicket(id, product) {
  return (
    await fetch(`${API_URL}/tickets/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product),
    })
  ).json();
}

export async function activateSell(id) {
  return (await fetch(`${API_URL}/tickets/enable/${id}`)).json();
}

export async function archiveSell(id) {
  return (await fetch(`${API_URL}/tickets/archive/${id}`)).json();
}

export async function wishTicket(id) {
  return (await fetch(`${API_URL}/tickets/wish/${id}`, { credentials: "include" })).json();
}
