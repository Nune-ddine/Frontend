// src/components/optionComponents/SecFeatBox.tsx
import React from 'react';
import styled from 'styled-components';
import SecFeatRow from './SecFeatRow';

interface SecFeatBoxProps {
  items: { [key: string]: { name: string; img: string }[] }; // 카테고리에 맞는 아이템 목록
  onSelectImage: (img: string) => void;
}

const SecFeatBox: React.FC<SecFeatBoxProps> = ({ items, onSelectImage }) => {
  return (
    <Wrapper>
      {Object.keys(items).map((partKey) => (
        <SecFeatRow key={partKey} partKey={partKey} items={items[partKey]} onSelectImage={onSelectImage} />
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
