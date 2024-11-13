// src/pages/SnowmanResultPage.tsx
import styled from 'styled-components';
import SnowmanResult from '../components/snowmanResultPage/SnowmanResult';
import ResultButtons from '../components/snowmanResultPage/ResultButtons';
import { useLocation } from 'react-router-dom';

const SnowmanResultPage = () => {
  const location = useLocation();
  const finalImage = location.state?.finalImage;

  return (
    <Wrapper>
      <SnowmanResult image={finalImage} /> {/* 최종 PNG 이미지 전달 */}
      <ResultButtons />
    </Wrapper>
  );
};

export default SnowmanResultPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
