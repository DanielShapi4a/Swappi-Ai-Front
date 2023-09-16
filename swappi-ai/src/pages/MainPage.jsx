import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Category from '../components/Category';
import CategoryImg from '../assets/images/Category.jpeg';
import CustomDiv from '../components/CustomDiv';

const hotCategories = [
  {
    title: 'Category 1',
    description: 'Short description for Category 1',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 2',
    description: 'Short description for Category 2',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 2',
    description: 'Short description for Category 2',
    image: CategoryImg, // Replace with the actual image URL
  },
  // Add more "HOT" categories as needed
];

const nonHotCategories = [
  {
    title: 'Category 3',
    description: 'Short description for Category 3',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 4',
    description: 'Short description for Category 4',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 5',
    description: 'Short description for Category 3',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 6',
    description: 'Short description for Category 4',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 7',
    description: 'Short description for Category 3',
    image: CategoryImg, // Replace with the actual image URL
  },
  {
    title: 'Category 8',
    description: 'Short description for Category 4',
    image: CategoryImg, // Replace with the actual image URL
  },
  // Add more "NON HOT" categories as needed
];

function MainPage() {

  const [showNonHot, setShowNonHot] = useState(false);



  return (
    <div className="App">
      <Navbar style={{ marginBottom: '100px' }} />

      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1
          style={{
            color: '#FDA77F',
            fontFamily: 'Syncopate',
            fontSize: '120px',
            fontStyle: 'normal',
            fontWeight: '200',
            lineHeight: '105px', /* 114.865% */
          }}
        >
          Unlock the world of ticket trading
        </h1>
        <p
          style={{
            color: '#1B729D',
            fontFamily: 'Syncopate',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '70px', /* 218.75% */
          }}
        >
          Your One-Stop Marketplace for All Kinds Ticket Transactions
        </p>
        <button
          style={{
            backgroundColor: '#FDA77F',
            borderRadius: '35px',
            height: '60px',
            width: '316px',
            color: '#fff',
            borderColor: 'transparent',
            cursor: 'pointer',
            marginTop: '30px',
            marginBottom: '100px', // Add margin-top for spacing
          }}
        >
          Begin your journey
        </button>
        <CustomDiv/>
 


        {/* "HOT" Categories Section */}
        <div className="categories-section" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {hotCategories.map((category, index) => (
            <Category
              key={index}
              title={category.title}
              description={category.description}
              image={category.image}
            />
          ))}
        </div>
        {/* Filter Button for "NON HOT" Categories (on the left) */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginLeft: '30px', flexDirection: 'column' }}>
          <button
            onClick={() => setShowNonHot(!showNonHot)}
            style={{
              backgroundColor: '#FDA77F',
              borderRadius: '35px',
              height: '60px',
              width: '316px',
              color: '#fff',
              borderColor: 'transparent',
              cursor: 'pointer',
              marginBottom: '20px',
              alignSelf: 'flex-start',
            }}
          >
            {showNonHot ? 'Hide NON HOT Categories' : 'Show NON HOT Categories'}
          </button>
          {/* "NON HOT" Categories Section (conditionally displayed based on "showNonHot" state) */}
          {showNonHot && (
            <div className="categories-section" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {nonHotCategories.map((category, index) => (
                <Category
                  key={index}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;