import React from 'react';
import styled from 'styled-components';
import { snowmanState } from '../../contexts/snowmanState';
import { useRecoilState } from 'recoil';

const SnowmanResult: React.FC = () => {
  const [snowman] = useRecoilState(snowmanState); // snowman 상태 읽기

  return (
    <Wrapper>
      <Title>눈사람이 완성되었어요!</Title>
      {snowman && snowman.image ? (
        <SnowmanContainer>
          <SnowmanImg src={snowman.image} alt="Final Snowman" />
        </SnowmanContainer>
      ) : (
        <p>No image available</p>
      )}
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
  width: 100%; // 부모 크기에 비례한 이미지 크기 조정
  max-height: 60%; // 부모 높이에 비례
  overflow: hidden;
  position: relative;
`;

const SnowmanImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; // 비율 유지
  margin: auto;
`;

const SnowmanName = styled.div`
  background-color: #D4EAFF;
  font-family: sans-serif;
  padding: 10px;
  width: 50%; // 이름 박스 크기 확대
  text-align: center;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  color: #513421;
`;
