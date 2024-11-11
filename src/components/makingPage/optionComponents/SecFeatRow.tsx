// src/components/SecFeatRow.tsx
import styled from 'styled-components';
import SecFeatCard from './SecFeatCard';

const SecFeatRow = () => {
  return (
    <Wrapper>
      <Title>제목</Title>
      <Content>
        <SecFeatCard />
        <SecFeatCard />
        <SecFeatCard />
        <SecFeatCard />
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
  height: 25%; /* 부모의 25% 높이 */
  box-sizing: border-box;
  border: 1px solid black;
`;

const Title = styled.div`
  width: 100%;
  height: 20%; /* 부모의 20% 높이 */
  box-sizing: border-box;
  border: 1px solid black;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80%; /* 남은 80% 높이 */
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid black;
`;
