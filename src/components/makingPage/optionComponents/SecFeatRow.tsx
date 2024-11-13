// src/components/optionComponents/SecFeatRow.tsx
import React from 'react';
import styled from 'styled-components';
import SecFeatCard from './SecFeatCard';

interface SecFeatRowProps {
  partKey: string;
  items: { name: string; img: string }[];
  onSelectImage: (img: string) => void;
}

const SecFeatRow: React.FC<SecFeatRowProps> = ({ partKey, items}) => {
  return (
    <Wrapper>
      <Title>{partKey}</Title>
      <Content>
        {items.map((item) => (
          <SecFeatCard key={item.name} name={item.name} img={item.img} />
        ))}
      </Content>
    </Wrapper>
  );
};

export default SecFeatRow;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 33%;
  box-sizing: border-box;
  border: 1px solid black;
`;

const Title = styled.div`
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  border: 1px solid black;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid black;
`;
