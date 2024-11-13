// src/components/SnowmanPart.tsx
import React from 'react';
import styled from 'styled-components';
import MakePNG from './MakePNG';
import { useNavigate } from 'react-router-dom';

interface SnowmanPartProps {
  selectedImage: string;
  selectedFeature: string;
  isQuizMode: boolean;
  setIsQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnowmanPart: React.FC<SnowmanPartProps> = ({ selectedImage, selectedFeature, isQuizMode, setIsQuizMode }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GotoMapBtn>MAP</GotoMapBtn>
      <SnowmanContainer>
        <MakePNG selectedImage={selectedImage} selectedFeature={selectedFeature} />
      </SnowmanContainer>
      <ButtonContainer>
        {isQuizMode ? (
          <>
            <BackButton onClick={() => setIsQuizMode(false)}>{'<-'}</BackButton>
            <NextButton onClick={() => navigate("/snowmanResult")}>완성</NextButton>
          </>
        ) : (
          <NextButton onClick={() => setIsQuizMode(true)}>{'->'}</NextButton>
        )}
      </ButtonContainer>
    </Wrapper>
  );
};

export default SnowmanPart;

const Wrapper = styled.div`
   width: 100%;
   height: 45%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   border: 2px solid black;
`;

const SnowmanContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   border: 2px solid black;
`;

const ButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 8px;
`;

const GotoMapBtn = styled.button`
   width: 10%;
   height: 7%;
   background-color: grey;
   border: none;
   cursor: pointer;
`;

const NextButton = styled.button`
   padding: 8px 16px;
   background-color: #4caf50;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
`;

const BackButton = styled.button`
   padding: 8px 16px;
   background-color: #f44336;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
`;
