// Ticket.js
import React from 'react';
import './Ticket.css';
import { Link } from 'react-router-dom';

function Ticket({ id, title, description, image, price}) {
  return (
    <div className="category" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
      <img src={image} alt={title} className="category-image" />
      <div className="category-details">
        <h2 className="category-title">{title}</h2>
        <p className="category-description">{description}</p>
        <span>{price} ₪</span>
      </div>
      <Link to={`/ticket/${id}`} className="category-button">See more</Link>
    </div>
  );
}

export default Ticket;
