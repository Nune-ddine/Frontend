// src/components/SnowmanPart.tsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import MakePNG, { MakePNGHandle } from './MakePNG';

interface SnowmanPartProps {
  selectedImage: string;
  selectedFeature: string;
  isQuizMode: boolean;
  setIsQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
  setFinalImage: (img: string) => void;
}

const SnowmanPart: React.FC<SnowmanPartProps> = ({ selectedImage, selectedFeature, isQuizMode, setIsQuizMode, setFinalImage }) => {
  const makePNGRef = useRef<MakePNGHandle>(null);

  const saveFinalImage = async () => {
    if (makePNGRef.current) {
      const image = await makePNGRef.current.captureImage();
      if (image) {
        setFinalImage(image);
      }
    }
  };

  return (
    <Wrapper>
      <GotoMapBtn>MAP</GotoMapBtn>
      <SnowmanContainer>
        <MakePNG ref={makePNGRef} selectedFeature={selectedFeature} isQuizMode={isQuizMode} /> {/* isQuizMode를 MakePNG에 전달 */}
      </SnowmanContainer>
      <ButtonContainer>
        {isQuizMode ? (
          <>
            <BackButton onClick={() => setIsQuizMode(false)}>{'<-'}</BackButton>
            <NextButton onClick={saveFinalImage}>완성</NextButton>
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
  position: relative;
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
