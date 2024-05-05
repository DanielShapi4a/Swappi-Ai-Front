import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "../../components/Categories/Ticket.js";
import Navbar from "../../components/Navigation Bar/Navbar.js";
import Footer from "../../components/Footer.js";
import "./OrdersPage.css";

function OrdersPage() {
  const [wishedProducts, setWishedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchWishedProducts(page) {
      try {
        const response = await axios.get(`/api/wishedProducts?page=${page}`);
        const { products } = response.data;
        if (products.length === 0) {
          setHasMore(false);
        } else {
          setWishedProducts((prevProducts) => [...prevProducts, ...products]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wished products:", error);
        setError("Error loading data. Please try again later.");
        setLoading(false);
      }
    }

    if (currentPage === 1) {
      fetchWishedProducts(currentPage);
    }

    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
        if (hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, hasMore]); // Dependency array only includes currentPage and hasMore

  return (
    
   <div>
      <Navbar/>
      <div className="orders-page">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : wishedProducts.length === 0 ? (
        <div>No wished products found.</div>
      ) : (
        <div className="category-grid">
          {wishedProducts.map((product) => (
            <Ticket
              key={product.id}
              id={product._id}
              title={product.title}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      )}
      {!hasMore && <div>No more products to load.</div>}
      </div>
      <Footer/>
    </div>
  );
}

export default OrdersPage;
