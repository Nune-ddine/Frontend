// src/components/ColorPickerWrapper.tsx
import React from 'react';
import styled from 'styled-components';

interface ColorPickerWrapperProps {
  onColorChange: (color: string) => void;
}

const ColorPickerWrapper: React.FC<ColorPickerWrapperProps> = ({ onColorChange }) => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  return (
    <Wrapper>
      {colors.map((color) => (
        <ColorBox
          key={color}
          color={color}
          onClick={() => onColorChange(color)}
        />
      ))}
    </Wrapper>
  );
};

export default ColorPickerWrapper;

// 스타일드 컴포넌트
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.8;
  }
`;
