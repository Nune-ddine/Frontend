// src/components/SecFeatCard.tsx
import React from 'react';
import styled from 'styled-components';

interface SecFeatCardProps {
  name: string;
  img: string;
}

const SecFeatCard: React.FC<SecFeatCardProps> = ({ name, img }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('imgSrc', img); // 드래그된 이미지의 경로를 저장
    event.dataTransfer.setData('name', name);
  };

  return (
    <Wrapper draggable onDragStart={handleDragStart}>
      <Image src={img} alt={name} />
      <div>{name}</div>
    </Wrapper>
  );
};

export default SecFeatCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  cursor: grab;
  font-family: sans-serif;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
