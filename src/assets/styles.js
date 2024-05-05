import styled from 'styled-components';
import images from './images.js'; 


export const StyledButton = styled.button`
  background-color: #FDA77F;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
`;

export const Avatar = styled.img`
  width: ${(props) => props.size || '32px'};
  height: ${(props) => props.size || '32px'};
  border-radius: 50%;
  margin-right: ${(props) => props.marginRight || '5px'};
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const MainHeading = styled.h1`
  color: #FDA77F;
  font-family: 'Syncopate';
  font-size: 120px;
  font-style: normal;
  font-weight: 300;
  line-height: 105px;
  width: 900px;
`;

export const SubHeading = styled.p`
  color: #1B729D;
  font-family: 'Syncopate';
  font-size: 50px;
  font-style: normal;
  font-weight: 200;
  line-height: 70px;
  width: 700px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

export const ProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  align-items: start; /* Adjust alignment as needed */
  justify-content: center;
  margin-top: 20px; /* Adjust margin as needed */
`;

export default {
  StyledButton,
  Avatar,
  MainContent,
  MainHeading,
  SubHeading,
  ProductGrid,
  ProductGridContainer,
};