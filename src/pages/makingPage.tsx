// src/pages/MakingPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';

const MakingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [isQuizMode, setIsQuizMode] = useState(false); // Quiz 모드 상태

  return (
    <PageWrapper>
      <Header />
      <SnowmanPart
        selectedImage={selectedImage}
        selectedFeature={selectedFeature}
        isQuizMode={isQuizMode} // isQuizMode 상태 전달
        setIsQuizMode={setIsQuizMode} // setIsQuizMode 함수 전달
      />
      <OptionPart
        onSelectImage={(img, feature) => {
          setSelectedImage(img);
          setSelectedFeature(feature);
        }}
        isQuizMode={isQuizMode} // isQuizMode 상태 전달
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
  background-color: #f0f0f0;
`;
