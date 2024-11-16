// src/components/optionComponents/SecFeatRow.tsx
import React from 'react';
import styled from 'styled-components';
import SecFeatCard from './SecFeatCard';

interface SecFeatRowProps {
  partKey: string;
  items: { name: string; img: string }[];
  onSelectImage: (img: string) => void;
}

const SecFeatRow: React.FC<SecFeatRowProps> = ({ partKey, items }) => {
  // 예시: itemExist 배열은 '외투' 카테고리의 아이템 존재 여부를 나타냄
  const itemExist = [false, false, true, false]; // '외투'에서 보유한 아이템 없음

  // 모든 값이 false인지 검사
  const allFalse = partKey === '외투' && itemExist.every((exist) => !exist);

  return (
    <Wrapper>
      <Title>
        <div>{partKey}</div>
      </Title>
      <Content>
        {allFalse ? (
          // 모든 아이템이 없는 경우 표시할 메시지
          <EmptyMessage>아직 아무것도 뽑지 못했어요ㅠ</EmptyMessage>
        ) : (
          // 아이템 존재 여부에 따라 렌더링
          items.map((item, idx) =>
            partKey === '외투'
              ? itemExist[idx]
                ? <SecFeatCard key={item.name} name={item.name} img={item.img} />
                : null
              : <SecFeatCard key={item.name} name={item.name} img={item.img} />
          )
        )}
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

  /* border: 1px solid black; */
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
  height: 90%;
  box-sizing: border-box;
  border-radius: 5px;
`;

const EmptyMessage = styled.div`
  width: 100%;
  font-size: 1.3rem;
  color: #999;
  text-align: center;
  padding: 10px;
`;
