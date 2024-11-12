// src/components/SecFeatCard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface SecFeatCardProps {
  name: string;
  img: string;
}

const SecFeatCard: React.FC<SecFeatCardProps> = ({ name, img }) => {
  const [imageError, setImageError] = useState(false); // 이미지 로드 오류 상태

  return (
    <Wrapper>
      {imageError ? (
        <Text>{name}</Text> // 이미지가 없을 때 이름을 표시
      ) : (
        <Image 
          src={img} 
          alt={name} 
          onError={() => setImageError(true)} // 오류 발생 시 대체 텍스트로 전환
        />
      )}
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

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const Text = styled.div`
  font-size: 1rem;
  color: white;
  text-align: center;
`;