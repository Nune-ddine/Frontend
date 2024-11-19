// src/pages/MakingPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getInventory } from '../services/api/snowmanAPI';
import { useRecoilState } from 'recoil';
import { inventoryState } from '../contexts/inventoryState';
import { snowmanState } from '../contexts/snowmanState';

const MakingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [inventory, setInventory] = useRecoilState(inventoryState);
  const [snowman, setSnowman] = useRecoilState(snowmanState);

  const navigate = useNavigate();

  useEffect(() => {
    if (finalImage) {
      navigate('/snowmanResult', { state: { finalImage } });
    }
  }, [finalImage, navigate]);
  // 페이지 렌더링될 때 snowmanState 모두 초기화(posX, posY는 유지)
  useEffect(() => {
    setSnowman((prevSnowman) => ({
      ...prevSnowman, // 기존 상태 유지
      name: '',
      image: '',
      quiz: '',
      answerId: 0,
      content1: '',
      content2: '',
      content3: '',
      // posX와 posY는 유지
    }));
  }, []);
  

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const itemExistOriginal = await getInventory();
        console.log("itemExistOriginal:", itemExistOriginal); // 데이터를 확인
        const sliced = itemExistOriginal
          .slice(24, 48).map((item: any) => item.available); // unlock 필드만 추출
        console.log("unlockFields:", sliced); // 추출된 unlock 필드 확인
        setInventory(sliced); // 추출한 배열을 상태로 저장
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };
    
  
    fetchInventory(); // 비동기 함수 호출
  }, []);
  

  return (
    <PageWrapper>
      <Header />
      <SnowmanPart
        selectedImage={selectedImage}
        selectedFeature={selectedFeature}
        isQuizMode={isQuizMode}
        setIsQuizMode={setIsQuizMode}
        setFinalImage={setFinalImage}
      />
      <OptionPart
        onSelectImage={(img, feature) => {
          setSelectedImage(img);
          setSelectedFeature(feature);
        }}
        isQuizMode={isQuizMode} // isQuizMode를 OptionPart에 전달
      />
    </PageWrapper>
  );
};

export default MakingPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  height: 100%;
  background-color: #F3F9FF; 
  font-family: 'Maplestory-Bold', sans-serif;
`
