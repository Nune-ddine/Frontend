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
      <LeftBtnContainer>
        <GotoMapBtn>{'<'} 맵으로 돌아가기</GotoMapBtn>
        {isQuizMode ? (
            <BackButton onClick={() => setIsQuizMode(false)}>{'<'}</BackButton>
        ) : ( <></>
        )}
      </LeftBtnContainer>
      <SnowmanContainer>
        <MakePNG ref={makePNGRef} selectedFeature={selectedFeature} isQuizMode={isQuizMode} /> {/* isQuizMode를 MakePNG에 전달 */}
      </SnowmanContainer>
      <RightBtnContainer>
        {isQuizMode ? (
          <>
            <NextButton onClick={saveFinalImage}>{'>'}</NextButton>
          </>
        ) : (
          <NextButton onClick={() => setIsQuizMode(true)}>{'>'}</NextButton>
        )}
      </RightBtnContainer>
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
  /* border: 2px solid black; */
`;

const LeftBtnContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 20%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SnowmanContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 2px solid black; */
  position: relative;
`;

const RightBtnContainer = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const GotoMapBtn = styled.button`
  background-color: #E4F1FF;
  padding: 8px 1px;
  width: 100%;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  margin-left: 15px;
  margin-top: 10px;
  color: #3D9BF2;
  font-family: "Maplestory-Bold", sans-serif;
  font-size: 10px;
`;

const NextButton = styled.button`
  padding: 9px;
  background-color: #FFF1D2;
  color: #513421;
  border: none;
  border-radius: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  border: 1px solid #513421;
  margin-bottom: 15px;
`;

const BackButton = styled.button`
  padding: 9px;
  background-color: #FFF1D2;
  color: #513421;
  border: none;
  border-radius: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  border: 1px solid #513421;
  margin-bottom: 15px;
`;
