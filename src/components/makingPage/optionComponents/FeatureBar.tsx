// src/components/optionComponents/FeatureBar.tsx
import styled from 'styled-components';

type FeatureType = '형태' | '얼굴' | '옷';

interface FeatureBarProps {
  onFeatureClick: (feature: FeatureType) => void;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ onFeatureClick }) => {
  return (
    <Wrapper>
      <Feature onClick={() => onFeatureClick("형태")}>형태</Feature>
      <Feature onClick={() => onFeatureClick("얼굴")}>얼굴</Feature>
      <Feature onClick={() => onFeatureClick("옷")}>옷</Feature>
    </Wrapper>
  );
};

export default FeatureBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  /* border: 2px solid black; */
  box-sizing: border-box;
`;

const Feature = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 23%;
  height: 100%;
  border-radius: 5px;
  background-color: #E4F1FF;
  border: 1px solid #3D9BF2;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  color: #3D9BF2;
`;
