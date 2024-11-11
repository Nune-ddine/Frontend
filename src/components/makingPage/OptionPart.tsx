// src/components/OptionPart.tsx
import React from 'react';
import styled from 'styled-components';
import WheelPickerTest from './optionComponents/WheelPickerTest';
import FeatureBar from './optionComponents/FeatureBar';

interface OptionPartProps {
  onColorChange: (color: string) => void;
}

const OptionPart: React.FC<OptionPartProps> = ({ onColorChange }) => {
  return (
    <Wrapper>
      <FeatureBar />
      <SecondFeature>
         <WheelPickerTest onColorChange={onColorChange} />
      </SecondFeature>
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