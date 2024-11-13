// src/components/snowmanResultPage/SnowmanResult.tsx
import React from 'react';
import styled from 'styled-components';

interface SnowmanResultProps {
  image: string | null; // 최종 PNG 이미지 경로
}

const SnowmanResult: React.FC<SnowmanResultProps> = ({ image }) => {
  return (
    <Wrapper>
      <Title>눈사람이 완성되었어요!</Title>
      {image ? <SnowmanImg src={image} alt="Final Snowman" /> : <p>No image available</p>}
      <SnowmanNameInput type="text" placeholder="눈사람에게 이름을 지어주세요" />
    </Wrapper>
  );
};

export default SnowmanResult;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;
  box-sizing: border-box;
  border: 2px solid grey;
`;

const Title = styled.div`
  font-family: 'Maplestory-Bold', sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SnowmanImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SnowmanNameInput = styled.input`
  width: 50%;
  height: 15%;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
`;