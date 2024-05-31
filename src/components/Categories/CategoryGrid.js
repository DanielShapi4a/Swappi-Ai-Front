import React, { useEffect, useState } from 'react';
import { API_URL } from '../../services/constants.js';
import Ticket from './Ticket.js';
import './Ticket.css';
import './CategoryGrid.css';
import { getDataForCategoryByName, HandleGetAllTickets } from '../../services/productData';

function CategoryGrid({ selectedCategory }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        if (selectedCategory !== "all") {
          // Fetch category data by name
          const categoryData = await getDataForCategoryByName(selectedCategory);
          const ticketIds = categoryData.ticketIds;
          const ticketPromises = ticketIds.map(async (ticketId) => {
            // Fetch ticket data by ID
            const response = await fetch(`${API_URL}/tickets/getTicket/${ticketId}`, { credentials: "include" });
            const ticketData = await response.json();
            return ticketData;
          });
          // Resolve all ticket promises
          const ticketResults = await Promise.all(ticketPromises);
          setTickets(ticketResults);
          setLoading(false);
        } else {
          // Handle case when "all" category is selected
          const allTicketsData = await HandleGetAllTickets();
          const allTicketIds = allTicketsData.ticketIds;
          const ticketPromises = allTicketIds.map(async (ticketId) => {
            // Fetch ticket data by ID
            const response = await fetch(`${API_URL}/tickets/getTicket/${ticketId}`, { credentials: "include" });
            const ticketData = await response.json();
            return ticketData;
          });
          // Resolve all ticket promises
          const ticketResults = await Promise.all(ticketPromises);
          setTickets(ticketResults);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Error loading tickets. Please try again later.');
        setLoading(false);
      }
    };

    fetchTickets();
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
          {tickets.map((ticket, index) => (
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
