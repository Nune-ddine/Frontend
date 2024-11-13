// src/components/optionComponents/SecFeatCard.tsx
import React from 'react';
import styled from 'styled-components';

interface SecFeatCardProps {
  name: string;
  img: string;
  onSelectImage: (img: string) => void;
}

const SecFeatCard: React.FC<SecFeatCardProps> = ({ name, img, onSelectImage }) => {
  return (
    <Wrapper onClick={() => onSelectImage(img)}>
      <Image src={img} alt={name} onError={(e) => (e.currentTarget.style.display = 'none')} />
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default SecFeatCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background-color: grey;
  border: 1px solid black;
  border-radius: 8px;
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const Name = styled.div`
  font-size: 0.8rem;
  color: white;
  margin-top: 5px;
`;
