// src/components/SecFeatCard.tsx
import styled from 'styled-components';

const SecFeatCard = () => {
  return (
    <Wrapper>
      <div>Card</div>
    </Wrapper>  
  );
};

export default SecFeatCard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%; /* 부모의 20% 너비 */
  height: 80%; /* 부모의 80% 높이 */
  box-sizing: border-box;
  background-color: grey;
  border: 1px solid black;
`;
