// src/components/WheelPickerTest.tsx
import { Wheel } from '@uiw/react-color';
import React, { useState } from 'react';

interface WheelPickerTestProps {
  onColorChange: (color: string) => void;
}

const WheelPickerTest: React.FC<WheelPickerTestProps> = ({ onColorChange }) => {
  const [hex, setHex] = useState("#fff");

  return (
    <Wheel
      color={hex}
      onChange={(color) => {
        setHex(color.hex);
        onColorChange(color.hex); // 선택한 색상을 부모 컴포넌트로 전달
      }}
    />
  );
};

export default WheelPickerTest;
