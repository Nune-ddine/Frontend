// src/components/SecFeatBox.tsx
import React from 'react';
import SecFeatRow from './SecFeatRow';
import styled from 'styled-components';

interface SecFeatBoxProps {
  feat: string;
}

const SecFeatBox: React.FC<SecFeatBoxProps> = ({ feat }) => {
  return (
    <Wrapper>
      <SecFeatRow />
      <SecFeatRow />
      <SecFeatRow />
      <SecFeatRow />
    </Wrapper>
  );
};

export default SecFeatBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%; /* 부모의 높이에 맞춰 고정 */
  max-height: 400px; /* 필요 시 고정된 최대 높이 설정 */
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
`;
