import React, { useRef } from 'react';
import styled from 'styled-components';
import MakePNG from './MakePNG';
import { isQuizModeState, snowmanState } from '../../contexts/snowmanState';
import { useRecoilState } from 'recoil';
import { createSnowman } from '../../services/snomanAPI';
import { useNavigate } from 'react-router-dom';

const SnowmanPart = () => {
  const [snowman, setSnowman] = useRecoilState(snowmanState);
  const [isQuizMode, setIsQuizMode] = useRecoilState(isQuizModeState);

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('Updated snowman:', snowman);
  }, [snowman]);

  const saveFinalImage = async () => {
    // if (makePNGRef.current) {
    //   const image = await makePNGRef.current.captureImage();
    //   if (image) {
    //     console.log('Captured image:', image);
    //     setSnowman((prevSnowman) => ({
    //       ...prevSnowman,
    //       image, // 이미지 설정
    //     }));
    //     console.log('Final snowman state:', snowman);
    //     createSnowman(snowman); // 서버에 저장 (API 호출)
    //   }
    // }
  };

  return (
    <Wrapper>
      <LeftBtnContainer>
        <GotoMapBtn>{'<'} 맵으로 돌아가기</GotoMapBtn>
        {isQuizMode && (
          <BackButton
            src="/images/etc/leftBtn.png"
            onClick={() => setIsQuizMode(false)}
          />
        )}
      </LeftBtnContainer>
      <SnowmanContainer>
        <MakePNG  />
      </SnowmanContainer>
      <RightBtnContainer>
        {isQuizMode ? (
          <NextButton
            src="/images/etc/rightBtn.png"
            id="doneBtn"
            onClick={() => navigate('/snowmanResult')}
          />
        ) : (
          <NextButton
            src="/images/etc/rightBtn.png"
            id="nextBtn"
            onClick={() => setIsQuizMode(true)}
          />
        )}
      </RightBtnContainer>
    </Wrapper>
  );
};

export default SnowmanPart;

const Wrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
