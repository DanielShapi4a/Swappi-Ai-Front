import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navigation Bar/Navbar";
import { getSpecific } from "../../services/productData";
import './TicketDetails.css';

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        console.log("TicketDetails id:", id);
        const data = await getSpecific(id);
        console.log("Fetched ticket with id:", id);
        setTicket(data);
        setLoading(false);
      } catch (error) {
        setError("Error loading the requested ticket");
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  return (
    <div>
      <Navbar/>
      <div className="ticket-details-container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : !ticket ? (
          <div>No ticket found.</div>
        ) : (
          <div>
            <h2 className="ticket-details-title">{ticket.title}</h2>
            <img
              src={ticket.image}
              alt={ticket.title}
              className="ticket-details-image"
            />
            <p className="ticket-details-description">{ticket.description}</p>
            <p className="ticket-details-price">Price: ${ticket.price}</p>
            <p className="ticket-details-details">City: {ticket.city}</p>
            <p className="ticket-details-details">Category: {ticket.category}</p>
            <p className="ticket-details-details">Seller: {ticket.seller.name}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketDetails;