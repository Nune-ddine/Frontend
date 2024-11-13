// src/components/snowmanResultPage/SnowmanResult.tsx
import React from 'react';
import styled from 'styled-components';

interface SnowmanResultProps {
  image: string | null; // 최종 PNG 이미지 경로
}

const SnowmanResult: React.FC<SnowmanResultProps> = ({ image }) => {
  return (
    <Wrapper>
      {image ? <img src={image} alt="Final Snowman" /> : <p>No image available</p>}
    </Wrapper>
  );
};

export default SnowmanResult;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
