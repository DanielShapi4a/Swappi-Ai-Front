import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecific } from "../../services/productData";

function TicketDetails() {
  const { id } = useParams();
  console.log('TicketDetails id:', id);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        console.log("Received ID:", id); // Log the received ID
        const data = await getSpecific(id);
        setTicket(data);
        console.log("Fetched Data:", data); // Log the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        setError("Error loading the requested ticket");
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : !ticket ? (
        <div>No ticket found.</div>
      ) : (
        <div>
          <h2>{ticket.title}</h2>
          <p>{ticket.description}</p>
        </div>
      )}
    </div>
  );
}

export default TicketDetails;
