import React, { useState, useEffect } from 'react';
import { getCategoryNames, getDataForCategoryByName } from '../../services/productData';

function HotOffer({ onCategoryChange }) {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  const toggleFilter = async () => {
    if (!isFilterOpen) {
      try {
        const data = await getCategoryNames();
        const names = data.map(category => category.category_Name);
        console.log("Names got from getCategoryNames:",names);
        setCategoryNames(names);
      } catch (error) {
        console.error('Error fetching category names:', error);
      }
    }
    setFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
  }, [isFilterOpen]);

  const HandleCategoryChange = async (category) => {
    if (category === "all") {
      setCurrentCategory(category);
      onCategoryChange(category);
    } else {
      try {
        setCurrentCategory(category);
        onCategoryChange(category);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'left', width: '80%', margin: '10px' }}>
      <div className='Title' style={{ fontSize: "2rem", fontWeight: 'bold', color: '#1B729D' }}>
        Hot Offers
      </div>
      <div className='Last-offers' color='grey' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', fontSize: "1.5rem" }}>
          Last offers of the week
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: '500', color: 'grey', maxWidth: '80%', fontSize: "1.75rem" }}>
            Explore our best offers!
          </span>
          <span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1B729D' }} onClick={toggleFilter}>
            Filter
          </span>
        </div>
      </div>

      {isFilterOpen && (
        <div>
          {/* Render your filter options here using the categoryNames state */}
          <div className='filter-options' style={{ display: "flex", gap: "4rem", fontSize: "1.5rem", marginBottom: "2rem" }}>
            {categoryNames.map((category, index) => (
              <button key={index} onClick={() => HandleCategoryChange(category)}>{category}</button>
            ))}
            <button onClick={() => HandleCategoryChange("all")}>Show All</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotOffer;
