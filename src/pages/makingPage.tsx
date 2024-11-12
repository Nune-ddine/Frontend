// src/pages/MakingPage.tsx
import React from 'react';
import styled from 'styled-components';
import OptionPart from '../components/makingPage/OptionPart';
import SnowmanPart from '../components/makingPage/SnowmanPart';
import Header from '../components/Header';

const MakingPage: React.FC = () => {
  // const [shapeColor, setShapeColor] = useState('#d3c0a6'); // 초기 도형 색상 @@컬러휠 하면 쓸 거@@

  return (
    <PageWrapper>
      <Header/>
      {/* <SnowmanPart color={shapeColor} /> */}
      <SnowmanPart />
      {/* <OptionPart onColorChange={(color) => setShapeColor(color)} /> @@컬러휠 하면 쓸 거@@*/} 
      <OptionPart />
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
