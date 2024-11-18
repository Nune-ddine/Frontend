// src/pages/MakingPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getInventory } from '../services/api/snowmanAPI';

const MakingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [inventory, setInventory] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (finalImage) {
      navigate('/snowmanResult', { state: { finalImage } });
    }
  }, [finalImage, navigate]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const itemExistOriginal = await getInventory();
  
        // 24번째부터 48번째 값의 'unLock' 필드만 추출
        const unlockFields = itemExistOriginal
          .slice(24, 48)
          .map((item: { itemId: number; itemName: string; unLock: boolean }) => item.unLock);
  
        setInventory(unlockFields); // 추출한 배열을 상태로 저장
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
  width: 100%;
  height: 100%;
  background-color: #F3F9FF;

  font-family: 'Maplestory-Bold', sans-serif;
`
