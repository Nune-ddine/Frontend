import React from 'react';
import styled from 'styled-components';

interface SnowmanResultProps {
  image: string | null; // 최종 PNG 이미지 경로
}

const SnowmanResult: React.FC<SnowmanResultProps> = ({ image }) => {
  return (
    <Wrapper>
      <Title>눈사람이 완성되었어요!</Title>
      {image ? <SnowmanContainer><SnowmanImg src={image} alt="Final Snowman" /></SnowmanContainer> : <p>No image available</p>}
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
  height: 100%; 
  box-sizing: border-box;

  padding-top: 20%;
`;

const Title = styled.div`
  font-family: 'Maplestory-Bold', sans-serif;
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #513421;
`;

const SnowmanContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%; // 부모 크기에 비례한 이미지 크기 조정
  height: 70%;
  overflow: hidden;
`;

const SnowmanImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; // 찌그러지지 않게 조정
`;

const SnowmanName = styled.div`
  background-color: #D4EAFF;
  font-family: sans-serif;
  padding: 10px;
  width: 22%;
  text-align: center;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  color: #513421;
`;
