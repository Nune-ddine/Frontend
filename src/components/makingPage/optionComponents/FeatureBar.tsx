// src/components/optionComponents/FeatureBar.tsx
import styled from 'styled-components';

type FeatureType = 'shape' | 'face' | 'clothes';

interface FeatureBarProps {
  onFeatureClick: (feature: FeatureType) => void;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ onFeatureClick }) => {
  return (
    <Wrapper>
      <Feature onClick={() => onFeatureClick("shape")}>형태</Feature>
      <Feature onClick={() => onFeatureClick("face")}>얼굴</Feature>
      <Feature onClick={() => onFeatureClick("clothes")}>옷</Feature>
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
