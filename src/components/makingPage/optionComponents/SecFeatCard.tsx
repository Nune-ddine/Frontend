// src/components/SecFeatCard.tsx
import React from 'react';
import styled from 'styled-components';

interface SecFeatCardProps {
  name: string;
}

const SecFeatCard: React.FC<SecFeatCardProps> = ({ name }) => {
  return (
    <Wrapper>
      <div>{name}</div>
    </Wrapper>
  );
};

export default SecFeatCard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  background-color: grey;
  border: 1px solid black;
  border-radius: 8px;
`;
