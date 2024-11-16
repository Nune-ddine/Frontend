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
      <SnowmanName>오유진의 눈사람</SnowmanName> 
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
  height: 70%; 
  box-sizing: border-box;

  padding-top: 20%;
`;

const Title = styled.div`
  font-family: 'Maplestory-Bold', sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #513421;
`;

const SnowmanImg = styled.img`
  width: 100%;
  height: 70%;
  object-fit: contain;
  margin-top: -5%; //todo: 이렇게 해도 되나..
`;

const SnowmanName = styled.div`
  background-color: #D4EAFF;
  font-family: sans-serif;
  padding: 10px;
  width: 22%;
  text-align: center;
  border-radius: 40px;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 1rem;
  color: #513421;
`;