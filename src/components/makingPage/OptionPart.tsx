// src/components/OptionPart.tsx
import React from 'react';
import styled from 'styled-components';
import WheelPickerTest from './optionComponents/WheelPickerTest';


interface OptionPartProps {
  onColorChange: (color: string) => void;
}

const OptionPart: React.FC<OptionPartProps> = ({ onColorChange }) => {
  return (
    <Wrapper>
      <h3>색상 선택</h3>
      <WheelPickerTest onColorChange={onColorChange} />
    </Wrapper>
  );
};

export default OptionPart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
