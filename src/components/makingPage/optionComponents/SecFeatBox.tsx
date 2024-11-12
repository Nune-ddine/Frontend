// src/components/SecFeatBox.tsx
import React from 'react';
import styled from 'styled-components';
import SecFeatRow from './SecFeatRow';
import { SNOWMAN_ITEMS } from '../../../constants/snowmanItems';

interface SecFeatBoxProps {
  feat: keyof typeof SNOWMAN_ITEMS; // 'shape' | 'face' | 'clothes' 중 하나
}

const SecFeatBox: React.FC<SecFeatBoxProps> = ({ feat }) => {
  const parts = SNOWMAN_ITEMS[feat]; // 대분류에 맞는 소분류 데이터를 가져옴

  return (
    <Wrapper>
      {Object.keys(parts).map((partKey) => (
        <SecFeatRow 
          key={partKey} 
          partKey={partKey as keyof typeof parts} 
          items={parts[partKey as keyof typeof parts]} 
        />
      ))}
    </Wrapper>
  );
};

export default SecFeatBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 400px;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
`;
