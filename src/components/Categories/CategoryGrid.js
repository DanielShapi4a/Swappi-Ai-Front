import React, { useEffect, useState } from 'react';
import { API_URL } from '../../services/constants.js';
import Ticket from './Ticket.js';
import { getDataForCategoryByName } from '../../services/productData'; // Import the function to fetch category data
import './Ticket.css';
import './CategoryGrid.css';

function CategoryGrid({ selectedCategory }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        console.log("Fetching tickets for category:", selectedCategory);
        // Fetch category data by name
        const categoryData = await getDataForCategoryByName(selectedCategory);
        console.log("Category data:", categoryData);
        const ticketIds = categoryData.ticketIds;
        console.log("Ticket IDs:", ticketIds);
        const ticketPromises = ticketIds.map(async (ticketId) => {
          // Fetch ticket data by ID
          console.log("Fetching ticket data for ticket ID:", ticketId);
          const response = await fetch(`${API_URL}/tickets/getTicket/${ticketId}`, { credentials: "include" });
          const ticketData = await response.json();
          console.log("Ticket data:", ticketData);
          return ticketData;
        });
        // Resolve all ticket promises
        const ticketResults = await Promise.all(ticketPromises);
        console.log("Resolved ticket results:", ticketResults);
        setTickets(ticketResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Error loading tickets. Please try again later.');
        setLoading(false);
      }
    };

    if (selectedCategory !== "all") {
      fetchTickets();
    } else {
      // Handle case when "all" category is selected
      setTickets([]);
      setLoading(false);
    }
  }, [selectedCategory]);

  return (
    <div className="categories-section">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : tickets.length === 0 ? (
        <div>No tickets found in this category.</div>
      ) : (
        <div className="category-grid">
          {tickets.map((ticket) => (
            <Ticket
              key={ticket._id}
              id={ticket._id}
              title={ticket.title}
              description={ticket.description}
              image={ticket.image}
              price={ticket.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryGrid;
