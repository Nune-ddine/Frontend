// src/pages/MakingPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';

const MakingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(''); // 선택된 이미지 상태
  const [selectedFeature, setSelectedFeature] = useState<string>(''); // 선택된 소분류 상태

  return (
    <PageWrapper>
      <Header />
      <SnowmanPart selectedImage={selectedImage} selectedFeature={selectedFeature} /> {/* 선택된 이미지와 소분류 전달 */}
      <OptionPart 
        onSelectImage={(img, feature) => {
          setSelectedImage(img);
          setSelectedFeature(feature);
        }} 
      /> {/* OptionPart에서 이미지와 소분류를 함께 선택 */}
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
  background-color: #f0f0f0;
`;
