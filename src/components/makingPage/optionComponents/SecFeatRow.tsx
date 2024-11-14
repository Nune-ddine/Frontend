// src/components/optionComponents/SecFeatRow.tsx
import React from 'react';
import styled from 'styled-components';
import SecFeatCard from './SecFeatCard';

interface SecFeatRowProps {
  partKey: string;
  items: { name: string; img: string }[];
  onSelectImage: (img: string) => void;
}

const SecFeatRow: React.FC<SecFeatRowProps> = ({ partKey, items}) => {
  return (
    <Wrapper>
      <Title><div>{partKey}</div></Title>
      <Content>
        {items.map((item) => (
          <SecFeatCard key={item.name} name={item.name} img={item.img} />
        ))}
      </Content>
    </Wrapper>
  );
};

export default SecFeatRow;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 33%;
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 100%;
  height: 22%;
  display: flex; /* Title을 flex로 설정하여 중앙 정렬 */

  div {
    background-color: #E4F1FF;
    display: inline-flex; /* 텍스트 크기에 맞게 자동으로 조절 */
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #6FB5F6;
    padding: 4px 8px; /* 텍스트 주위에 여백 추가 */
    border-radius: 4px;
  }
`;


const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  border-radius: 5px;
`;
