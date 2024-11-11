// src/pages/MakingPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';

const MakingPage: React.FC = () => {
  const [shapeColor, setShapeColor] = useState('#d3c0a6'); // 초기 도형 색상

  return (
    <PageWrapper>
      <Header/>
      <SnowmanPart color={shapeColor} />
      <OptionPart onColorChange={(color) => setShapeColor(color)} />
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
