// src/components/SnowmanPart.tsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import MakePNG, { MakePNGHandle } from './MakePNG';
import { snowmanExsitState, snowmanState } from '../../contexts/snowmanState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { locatorIdState } from '../../contexts/recoilAtoms';
import { useNavigate } from 'react-router-dom';
import { createSnowman } from '../../services/api/snowmanAPI';

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
  const [isSnowmanExist, setIsSnowmanExist] = useRecoilState(snowmanExsitState);
  const id = useRecoilValue(locatorIdState);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('Updated snowman:', snowman);
    console.log('[Map number] :', id);
  }, [snowman]);

  const checkSnowmanExist = () => {
    if (!isSnowmanExist) {
      alert('눈사람을 먼저 만들어주세요!');
      return false;
    }
    return true;
  }


  const saveFinalImage = async () => {
    //snowman의 모든 필드가 입력되어있는지 확인 - exception handling
      //   if (!snowman.image){
      // alert("아직 눈사람의 형태가 없어요!");
      // return;}
    if (!snowman.name){
      alert("눈사람의 이름을 입력해주세요!"); 
      return;}
    if (!snowman.quiz){
      alert("문제를 입력해주세요!");
      return;}
    if (!snowman.content1 || !snowman.content2 || !snowman.content3){
      alert("보기를 모두 입력해주세요!");
      return;}
    if (!snowman.answerId){
      alert("입력하신 보기 중 정답을 골라주세요!");
      return;}

    // 진짜 만들 거냐고 물어보는 alert 창
    const confirm = window.confirm("한번 굴린 눈사람은 꽁꽁 얼어붙어서 수정할 수 없어요! \n눈사람을 굴리시겠어요?");
    if (!confirm) return;
    if (makePNGRef.current) {
      const image = await makePNGRef.current.captureImage();
      if (image) {
        console.log(image);
        setFinalImage(image);
  
        const updatedSnowman = {
          ...snowman,
          image: image, // 이미지 설정
        };
  
        setSnowman(updatedSnowman);
        printSnowman();
        console.log("Sending snowman data to API:", updatedSnowman);
        await createSnowman(updatedSnowman); // 업데이트된 값을 전달
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
        <GotoMapBtn onClick={() => navigate(`/locating/${id}`)}>{'<'} 맵으로 돌아가기</GotoMapBtn>
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
          <NextButton src="/images/etc/rightBtn.png" id="nextBtn" onClick={() => {
            if (checkSnowmanExist()) {
              setIsQuizMode(true);
            }
          }
          }/>
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
  height: 10%;
  aspect-ratio: 1/1;  
  cursor: pointer;
`;

const BackButton = styled.img`
  padding-bottom: 15px;
  height: 10%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;
