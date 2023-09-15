import React from 'react';
import Navbar from '../components/Navbar';

function MainPage() {
  return (
    <div className="App">
      <Navbar style={{ marginBottom: '100px' }} />
      <div className="main-content">
        <h1 style={{
          color: '#FDA77F',
          textAlign: 'center', /* Center align text horizontally */
          fontFamily: 'Syncopate',
          fontSize: '120px',
          fontStyle: 'normal',
          width: '100%', /* Set width to 100% for centering */
          fontWeight: '200',
          lineHeight: '105px',
        }}>Unlock the world of ticket trading</h1>
        <p style={{
          color: '#1B729D',
          textAlign: 'center',
          fontFamily: 'Syncopate',
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '70px',
        }}>Your One-Stop Marketplace for All Kinds Ticket Transactions</p>
        <button style={{
          backgroundColor: '#FDA77F',
          borderRadius: '35px',
          height: '60px',
          width: '316px',
          color: '#fff',
          border: 'none',
          cursor: 'pointer', /* Remove the border */
        }}>Begin your journey</button>
      </div>
    </div>
  );
}

export default MainPage;
