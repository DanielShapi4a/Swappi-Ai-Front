import styled from 'styled-components';
import images from './images.js'; 

// Reusable styled components
export const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || '#007bff'};
  color: ${(props) => props.color || '#fff'};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: ${(props) => props.marginLeft || '10px'};
`;

export const Avatar = styled.img`
  width: ${(props) => props.size || '32px'};
  height: ${(props) => props.size || '32px'};
  border-radius: 50%;
  margin-right: ${(props) => props.marginRight || '5px'};
`;

// Add more styled components as needed
