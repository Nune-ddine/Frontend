// src/components/Snowman.tsx
import React from 'react';
import styled from 'styled-components';

interface SnowmanProps {
  color: string;
  size: number;
}

const Snowman: React.FC<SnowmanProps> = ({ color, size }) => {
  return <Part color={color} size={size} />;
};

export default Snowman;

const Part = styled.div<{ color: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
