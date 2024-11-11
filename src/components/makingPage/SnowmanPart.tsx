// src/components/SnowmanPart.tsx
import React from 'react';
import styled from 'styled-components';

interface SnowmanPartProps {
  color: string;
  size: number;
}

const SnowmanPart: React.FC<SnowmanPartProps> = ({ color, size }) => {
  return <Part color={color} size={size} />;
};

export default SnowmanPart;

const Part = styled.div<{ color: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
