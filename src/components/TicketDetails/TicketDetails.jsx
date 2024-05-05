import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navigation Bar/Navbar";
import { getSpecific } from "../../services/productData";
import "./TicketDetails.css";
import Footer from "../Footer";
import { getCategoryNames } from "../../services/productData";

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backGround, setBackGround] = useState(""); // background state
  const [categoryNames, setCategoryNames] = useState([]);

  const fetchCategoryNames = async () => {
    try {
      const names = await getCategoryNames();
      setCategoryNames(names);
      console.log("Category names:", names);
    } catch (error) {
      console.error("Error fetching category names:", error);
    }
  };
  const setBackgroundImage = async () => {
    console.log("Ticket Category", ticket.category);
    try {
      if (ticket && categoryNames.length > 0) {
        const foundCategory = categoryNames.find((category) => category === ticket.category);
        if (foundCategory) {
          if (foundCategory === "Concert") {
            setBackGround("concert");
          } else if (foundCategory === "Flight" || foundCategory === "Hotel" || foundCategory === "Vacation") {
            setBackGround("vacation");
          } else if (foundCategory === "Sport") {
            setBackGround("sport");
          } else if (foundCategory === "Other") {
            setBackGround("other");
          }
        }
      } else {
        setBackGround("other");
      }
    } catch (error) {
      setBackGround("other");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategoryNames(); // Wait for category names to be fetched
        const data = await getSpecific(id);
        setTicket(data);
        setLoading(false);
      } catch (error) {
        setError("Error loading the requested ticket");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (ticket) setBackgroundImage();
  }, [ticket, categoryNames]);

  return (
      <div className={`ticket-page ${backGround}`}>
        <Navbar />
        <div className="ticket-details-container">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : !ticket ? (
            <div>No ticket found.</div>
          ) : (
            <div className="main-ticket-content">
              <div className="ticket-header-container">
                <h2 className="ticket-details-title">{ticket.title}</h2>
                <img src={ticket.image} alt={ticket.title} className="ticket-details-image" />
              </div>
              <p className="ticket-details-description">{ticket.description}</p>
              <div className="ticket-info-container">
                <p className="ticket-details-price">Price: {ticket.price}₪</p>
                <p className="ticket-details-details">City: {ticket.city}</p>
                <p className="ticket-details-details">Category: {ticket.category}</p>
                {/* Add more details as needed */}
              </div>
              <p className="ticket-details-details" style={{ marginTop: "8rem", fontWeight: "500" }}>
                Seller: {ticket.seller.name}
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
  );
}

export default TicketDetails;
