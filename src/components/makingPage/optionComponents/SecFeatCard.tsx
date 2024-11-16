import React from 'react';
import styled, { css } from 'styled-components';

interface SecFeatCardProps {
  name: string;
  img: string;
}

const SecFeatCard: React.FC<SecFeatCardProps> = ({ name, img }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('imgsrc', img); // 드래그된 이미지의 경로를 저장
    event.dataTransfer.setData('name', name);
  };

  return (
    <Wrapper imgsrc={img} draggable onDragStart={handleDragStart}>
      <Image src={img} alt={name} draggable="false" />
      <div>{name}</div>
    </Wrapper>
  );
};

export default SecFeatCard;

interface WrapperProps {
  imgsrc: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 100%;
  cursor: grab;
  font-family: sans-serif;

  ${({ imgsrc }) =>
    imgsrc.includes('shape') &&
    css`
      width: 50%;

    `}

    /* border: 1px solid black; */
`;

const Image = styled.img`
  height: 40%;
  // 원본 이미지 비율을 유지
  aspect-ratio: attr(width) / attr(height);
  margin-bottom: 10px;

  user-select: none; /* 텍스트 선택 방지 */

  -webkit-touch-callout : none;
`;
