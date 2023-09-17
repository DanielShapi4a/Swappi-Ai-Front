import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomDiv from '../components/CustomDiv';
import { Button, Avatar } from '../assets/styles'; // Import styled components from your styles.js
import images from '../assets/images'; // Import image paths from your images.js
import CategoryGrid from '../components/CategoryGrid';
import CategoryImg from '../assets/images/Category.jpeg';


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

      <div
        className="main-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            color: '#FDA77F',
            fontFamily: 'Syncopate',
            fontSize: '120px',
            fontStyle: 'normal',
            fontWeight: '300',
            lineHeight: '105px',
            width: '900px',
          }}
        >
          Unlock the world of ticket trading
        </h1>
        <p
          style={{
            color: '#1B729D',
            fontFamily: 'Syncopate',
            fontSize: '50px',
            fontStyle: 'normal',
            fontWeight: '200',
            lineHeight: '70px',
            width: '700px',
          }}
        >
          Your One-Stop Marketplace for All Kinds Ticket Transactions
        </p>
        <Button
          backgroundColor="#FDA77F"
          color="#fff"
          borderRadius="35px"
          height="60px"
          width="300px" // Increase the width to accommodate the full text
          borderColor="transparent"
          cursor="pointer"
          marginTop="30px"
          marginBottom="100px"
          fontWeight="bold"
          fontSize="18px"
        >
          Begin your journey
        </Button>

        <CustomDiv />

        {/* "HOT" Categories Section */}
        <CategoryGrid categories={hotCategories} />

        {/* Filter Button for "NON HOT" Categories (on the left) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            margin: '30px'
          }}
        >
          <Button
            onClick={() => setShowNonHot(!showNonHot)}
            backgroundColor="#FDA77F"
            color="#fff"
            borderRadius="35px"
            height="60px"
            width="316px"
            borderColor="transparent"
            cursor="pointer"
            marginBottom="40px"
            marginTop="40px"
            alignSelf="flex-start"
            label={showNonHot ? 'Hide NON HOT Categories' : 'Show NON HOT Categories'}
          >
            Filter
          </Button>
          {/* "NON HOT" Categories Section (conditionally displayed based on "showNonHot" state) */}
          {showNonHot && <CategoryGrid categories={nonHotCategories} />}
        </div>
      </div>
    </div>
  );
}

export default MainPage;