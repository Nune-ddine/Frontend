// src/pages/MakingPage.tsx
import React, { useState } from 'react';

import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import Snowman from '../components/makingPage/snowmanComponent/Snowman';
import Header from '../components/Header';

const MakingPage: React.FC = () => {
  const [shapeColor, setShapeColor] = useState('#d3c0a6'); // 초기 도형 색상

  return (
    <PageWrapper>
      <Header/>
      <OptionPart onColorChange={(color) => setShapeColor(color)} />
      <Snowman color={shapeColor} />
    </PageWrapper>
  );
};

export default MakingPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;
