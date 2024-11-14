import React from 'react';
import styled, { css } from 'styled-components';

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
    <Wrapper imgSrc={img} draggable onDragStart={handleDragStart}>
      <Image src={img} alt={name} />
      <div>{name}</div>
    </Wrapper>
  );
};

export default SecFeatCard;

interface WrapperProps {
  imgSrc: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  cursor: grab;
  font-family: sans-serif;
  padding-left: 20px;
  padding-right: 20px;

  ${({ imgSrc }) =>
    imgSrc.includes('shape') &&
    css`
      width: 50%;

    `}
`;

const Image = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 10px;
`;
