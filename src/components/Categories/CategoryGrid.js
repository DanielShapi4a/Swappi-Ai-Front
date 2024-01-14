// CategoryGrid.js
import React, { useEffect, useState } from 'react';
import Ticket from './Ticket.js';
import { getAll } from '../../services/productData';
import './Ticket.css';
import './CategoryGrid.css';

function CategoryGrid({ selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadMoreProducts(page) {
      try {
        const data = await getAll(page, selectedCategory);
        if (Array.isArray(data.products)) {
          if (data.products.length === 0) {
            setHasMore(false);
          } else {
            setCategories((prevCategories) => [...prevCategories, ...data.products]);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error loading data. Please try again later.');
        setLoading(false);
      }
    }

    if (currentPage === 1) {
      loadMoreProducts(currentPage);
    }

    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
        if (hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedCategory, currentPage, hasMore]);

  return (
    <div className="categories-section">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : categories.length === 0 ? (
        <div>No categories found.</div>
      ) : (
        <div className="category-grid">
          {categories.map((category) => (
            <Ticket
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
            />
          ))}
        </div>
      )}
      {!hasMore && <div>No more products to load.</div>}
    </div>
  );
}

export default CategoryGrid;
