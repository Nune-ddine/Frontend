import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type FeatureType = '형태' | '얼굴' | '옷';

interface FeatureBarProps {
  onFeatureClick: (feature: FeatureType) => void;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ onFeatureClick }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(null); // 선택된 Feature 상태

  const handleClick = (feature: FeatureType) => {
    setSelectedFeature(feature); // 선택된 Feature 업데이트
    onFeatureClick(feature); // 부모 컴포넌트에 선택된 Feature 전달
  };

  return (
    <Wrapper>
      <Feature
        isSelected={selectedFeature === '형태'}
        onClick={() => handleClick('형태')}
      >
        형태
      </Feature>
      <Feature
        isSelected={selectedFeature === '얼굴'}
        onClick={() => handleClick('얼굴')}
      >
        얼굴
      </Feature>
      <Feature
        isSelected={selectedFeature === '옷'}
        onClick={() => handleClick('옷')}
      >
        옷
      </Feature>
    </Wrapper>
  );
};

export default FeatureBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
`;

const Feature = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 23%;
  height: 100%;
  border-radius: 5px;
  background-color: ${({ isSelected }) => (isSelected ? '#3D9BF2' : '#E4F1FF')};
  border: 1px solid #3D9BF2;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#3D9BF2')};
`;
