import React from 'react';

function CustomDiv() {
  const divStyle = {
    backgroundColor: '#1B729D',
    borderRadius: '66px',
    width: '1314px',
    height: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '50px',
  };

  const textStyle = {
    color: '#fcf0da',
    fontFamily: 'Kodchasan-Bold, Helvetica',
    fontSize: '22px',
    fontWeight: 700,
  };

  return (
    <div className="custom-div" style={divStyle}>
      <div style={{ flex: 1, ...textStyle }}>
        <p>Experience the Future of Ticket Trading with AI-Powered Convenience</p>
      </div>
      <div style={{ flex: 1, textAlign: 'center', ...textStyle }}>
        <p>Secure and transparent transaction process that safeguards your payment and personal information.</p>
      </div>
    </div>
  );
}

export default CustomDiv;
