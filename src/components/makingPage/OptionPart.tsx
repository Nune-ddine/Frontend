// src/components/OptionPart.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import FeatureBar from './optionComponents/FeatureBar';
import SecFeatBox from './optionComponents/SecFeatBox';
import { SNOWMAN_ITEMS } from '../../constants/snowmanItems';

type FeatureType = keyof typeof SNOWMAN_ITEMS; // 'shape' | 'face' | 'clothes'

interface OptionPartProps {
  onSelectImage: (img: string, feature: FeatureType) => void;
}

const OptionPart: React.FC<OptionPartProps> = ({ onSelectImage }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(null);

  const renderFeatureContent = () => {
    if (selectedFeature) {
      const items = SNOWMAN_ITEMS[selectedFeature];
      return <SecFeatBox items={items} onSelectImage={(img) => onSelectImage(img, selectedFeature)} />;
    }
    return null;
  };

  return (
    <Wrapper>
      <FeatureBar onFeatureClick={(feature: FeatureType) => setSelectedFeature(feature)} />
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
