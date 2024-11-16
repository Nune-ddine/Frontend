// src/components/SnowmanPart.tsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import MakePNG, { MakePNGHandle } from './MakePNG';
import { snowmanState } from '../../contexts/snowmanState';
import { useRecoilState } from 'recoil';
import { createSnowman } from '../../services/snomanAPI';

interface SnowmanPartProps {
  selectedImage: string;
  selectedFeature: string;
  isQuizMode: boolean;
  setIsQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
  setFinalImage: (img: string) => void;
}

const SnowmanPart: React.FC<SnowmanPartProps> = ({ selectedImage, selectedFeature, isQuizMode, setIsQuizMode, setFinalImage }) => {
  const makePNGRef = useRef<MakePNGHandle>(null);

  const [snowman, setSnowman] = useRecoilState(snowmanState);

  React.useEffect(() => {
    console.log('Updated snowman:', snowman);
  }, [snowman]);

  const saveFinalImage = async () => {
    if (makePNGRef.current) {
      const image = await makePNGRef.current.captureImage();
      if (image) {
        console.log(image);
        setFinalImage(image);
        setSnowman((prevSnowman) => ({
          ...prevSnowman,
          image: image, // 이미지 설정
        }));
        printSnowman();
        createSnowman(snowman);
      }
    }
  };

  //snowman 값들 console로 화긴하는 함수
  const printSnowman = () => {
    console.log(snowman);
  };

  return (
    <Wrapper>
      <LeftBtnContainer>
        <GotoMapBtn>{'<'} 맵으로 돌아가기</GotoMapBtn>
        {isQuizMode ? (
            <BackButton src="/images/etc/leftBtn.png" onClick={() => setIsQuizMode(false)}/>
        ) : ( <></>
        )}
      </LeftBtnContainer>
      <SnowmanContainer>
        <MakePNG ref={makePNGRef} selectedFeature={selectedFeature} isQuizMode={isQuizMode} /> {/* isQuizMode를 MakePNG에 전달 */}
      </SnowmanContainer>
      <RightBtnContainer>
        {isQuizMode ? (
          <>
            <NextButton src="/images/etc/rightBtn.png" id="doneBtn" onClick={saveFinalImage}/>
          </>
        ) : (
          <NextButton src="/images/etc/rightBtn.png" id="nextBtn" onClick={() => setIsQuizMode(true)}/>
        )}
      </RightBtnContainer>
    </Wrapper>
  );
};

export default SnowmanPart;

const Wrapper = styled.div`
  width: 100%;
  height: 50%;
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

  #doneBtn {
    font-size: 10px;
  }
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

const NextButton = styled.img`
  padding-bottom: 15px;
  height: 8%;
  aspect-ratio: 1/1;  
  cursor: pointer;
`;

const BackButton = styled.img`
  padding-bottom: 15px;
  height: 8%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;
