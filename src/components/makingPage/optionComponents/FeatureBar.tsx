// src/components/optionComponents/FeatureBar.tsx
import styled from 'styled-components';

interface FeatureBarProps {
  onFeatureClick: (feature: string) => void;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ onFeatureClick }) => {
  return (
    <Wrapper>
      <Feature onClick={() => onFeatureClick("형태")}>형태</Feature>
      <Feature onClick={() => onFeatureClick("색")}>색</Feature>
      <Feature onClick={() => onFeatureClick("얼굴")}>얼굴</Feature>
      <Feature onClick={() => onFeatureClick("옷")}>옷</Feature>
      <Feature onClick={() => onFeatureClick("DIY")}>DIY</Feature>
    </Wrapper>
  );
};

export default FeatureBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
  border: 2px solid black;
  padding: 10px;
  box-sizing: border-box;
`;

const Feature = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
  border-radius: 5px;
  background-color: #c7c7c7;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
`;
