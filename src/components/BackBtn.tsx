import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackBtn = () => {
    const navigate = useNavigate();
  return (
    <BackButton onClick={()=>navigate('/')}>◀</BackButton>
  )
}

export default BackBtn

export const BackButton = styled.button`
  top: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  background-color: #FFE2A4;
  border-radius: 100px;
  margin-left: 2%;
  width: 9%;
  height: 5%;
  padding: 10px;
  border: 1px solid #513421;
  font-size: 11px;
  color: #513421;
  div {
    background-color: #FFF1D2;
    border-radius: 100px;
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;
