// src/components/Snowman.tsx
import React from 'react';

import styled from 'styled-components';
import SnowmanPart from '../SnowmanPart';

interface SnowmanProps {
  color: string;
}

const Snowman: React.FC<SnowmanProps> = ({ color }) => {
  return (
    <SnowmanWrapper>
      <SnowmanPart color={color} size={50} /> {/* 머리 */}
      <SnowmanPart color={color} size={70} /> {/* 몸통 상단 */}
      <SnowmanPart color={color} size={90} /> {/* 몸통 하단 */}
    </SnowmanWrapper>
  );
};

export default Snowman;

const SnowmanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
