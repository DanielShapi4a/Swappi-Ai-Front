import styled from 'styled-components';
import images from './images.js'; 

// Reusable styled components
export const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || '#007bff'};
  color: ${(props) => props.color || '#fff'};
  border: none;
  border-radius: ${(props) => props.borderRadius || '4px'};
  padding: 5px 10px;
  cursor: pointer;
  margin-left: ${(props) => props.marginLeft || '0'}; 
  margin-bottom: ${(props) => props.marginLeft || '30px'}; 
  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  font-size: ${(props) => props.fontSize || 'inherit'};
`;

export const Avatar = styled.img`
  width: ${(props) => props.size || '32px'};
  height: ${(props) => props.size || '32px'};
  border-radius: 50%;
  margin-right: ${(props) => props.marginRight || '5px'};
`;

// Add more styled components as needed
