import React from "react";
import Ticket from "../../components/Categories/Ticket.js";
import { useLocation } from "react-router-dom";
import "./SearchResultPage.css";
import Navbar from "../../components/Navigation Bar/Navbar.js";
import Footer from "../../components/Footer.js";

const SearchResultPage = () => {
    const location = useLocation();
    const {results} = location.state || {results: []};

  return (
    <div>
        <Navbar />
            <div className='search-page'>
                <h1>Search Results</h1>
                <div className="result-container">
                    {results.length > 0 ? (
                        results.map((ticket, index) => (
                            <Ticket
                                key={ticket._id}
                                id={ticket._id}
                                title={ticket.title}
                                description={ticket.description}
                                image={ticket.image}
                                price={ticket.price}
                                
                            />
                        ))
                    ) : (
                        <h1>No results found</h1>
                    )}
                </div>
                <Footer />
            </div>
    </div>
  );
};

export default SearchResultPage;