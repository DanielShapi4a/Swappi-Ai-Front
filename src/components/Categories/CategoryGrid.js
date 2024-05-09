import React, { useEffect, useState } from 'react';
import Ticket from './Ticket.js';
import { getAll } from '../../services/productData';
import './Ticket.css';
import './CategoryGrid.css';

function CategoryGrid({ selectedCategory }) {
  const [data, setData] = useState([]);//data in here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || "all");

  useEffect(() => {
    setCurrentCategory(selectedCategory);
    const loadMoreProducts = async (page) => {
      try {
        const newData = await getAll(page, currentCategory);
        if (newData.products) {
          if (newData.products.length === 0) {
            // Handle case when no products are returned
            setData([]);
            alert("No tickets in the current category");
          } else {
            setData(newData.products);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error loading data. Please try again later.');
        setLoading(false);
      }
    };

    loadMoreProducts(currentPage);

    return () => {
      // Cleanup function
    };
  }, [currentCategory, currentPage, selectedCategory]);

  return (
    <div className="categories-section">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : data.length === 0 ? (
        <div>No categories found.</div>
      ) : (
        <div className="category-grid">
          {data.map((dataItem, key) => {
            return (
              <Ticket
                key={dataItem.id}
                id={dataItem._id}
                title={dataItem.title}
                description={dataItem.description}
                image={dataItem.image}
                price={dataItem.price}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryGrid;
