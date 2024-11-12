// src/components/OptionPart.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import WheelPickerTest from './optionComponents/WheelPickerTest';
import FeatureBar from './optionComponents/FeatureBar';
import SecFeatBox from './optionComponents/SecFeatBox';

interface OptionPartProps {
  onColorChange: (color: string) => void;
}

const OptionPart: React.FC<OptionPartProps> = ({ onColorChange }) => {
   const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

   const renderFeatureContent = () => {
      if (selectedFeature === "색") { //@@이거 사실 없애도 됨@@
      return <WheelPickerTest onColorChange={onColorChange} />;
      } else if (selectedFeature) {
      return <SecFeatBox feat={selectedFeature} />;
      }
      return null;
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
