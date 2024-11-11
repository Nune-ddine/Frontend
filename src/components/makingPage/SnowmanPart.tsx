// src/components/SnowmanPart.tsx
import React from 'react';
import styled from 'styled-components';
import Snowman from './snowmanComponent/Snowman';

interface SnowmanPartProps {
  color: string;
}

const SnowmanPart: React.FC<SnowmanPartProps> = ({ color }) => {
  return (
    <SnowmanWrapper>
      <Snowman color={color} size={70} /> {/* 머리 */}
      <Snowman color={color} size={90} /> {/* 몸통, 겹치게 조정 */}
    </SnowmanWrapper>
  );
};

export default SnowmanPart;

const SnowmanWrapper = styled.div`
   width: 100%;
   height: 45%;
   display: flex;
   flex-direction: column;
   align-items: center;

   border: 2px solid black;
`;
