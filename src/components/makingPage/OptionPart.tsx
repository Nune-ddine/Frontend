// src/components/OptionPart.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import WheelPickerTest from './optionComponents/WheelPickerTest';
import FeatureBar from './optionComponents/FeatureBar';

interface OptionPartProps {
  onColorChange: (color: string) => void;
}

const OptionPart: React.FC<OptionPartProps> = ({ onColorChange }) => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case "형태":
        return <div>형태 설정 옵션</div>;
      case "색":
        return <WheelPickerTest onColorChange={onColorChange} />;
      case "얼굴":
        return <div>얼굴 설정 옵션</div>;
      case "옷":
        return <div>옷 설정 옵션</div>;
      case "DIY":
        return <div>DIY 설정 옵션</div>;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <FeatureBar onFeatureClick={(feature) => setSelectedFeature(feature)} />
      <SecondFeature>{renderFeatureContent()}</SecondFeature>
    </Wrapper>
  );
};

export default OptionPart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55%;
  border: 2px solid black;
`;

const SecondFeature = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
