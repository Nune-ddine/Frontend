// src/components/optionComponents/FeatureBar.tsx
import styled from 'styled-components';
import { SNOWMAN_ITEMS } from '../../../constants/item_names';

type FeatureType = keyof typeof SNOWMAN_ITEMS; // 'shape' | 'face' | 'clothes'

interface FeatureBarProps {
  onFeatureClick: (feature: FeatureType) => void;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ onFeatureClick }) => {
  // 각 항목을 클릭 시, 대응되는 SNOWMAN_ITEMS의 키 값 전달
  return (
    <Wrapper>
      <Feature onClick={() => onFeatureClick("shape")}>형태</Feature>
      <Feature onClick={() => onFeatureClick("face")}>얼굴</Feature>
      <Feature onClick={() => onFeatureClick("clothes")}>옷</Feature>
      {/* DIY는 예시상 SNOWMAN_ITEMS에 없으므로 별도 추가 */}
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
