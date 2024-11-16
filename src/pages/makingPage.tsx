// src/pages/MakingPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getInventory } from '../services/snomanAPI';

const MakingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getInventory();
    if (finalImage) {
      navigate('/snowmanResult', { state: { finalImage } });
    }
  }, [finalImage, navigate]);

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
