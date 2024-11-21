import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Wrapper } from "./MyPage"
import styled from "styled-components";
import BackBtn from "../components/BackBtn";
import { useRecoilState } from "recoil";
import { isManualSelectionState, selectedMapState } from "../contexts/mapState";

const SelectingMapPage = () => {
  const navigate = useNavigate();
  const [selectedMap, setSelectedMap] = useRecoilState(selectedMapState);
  const [isManualSelection, setIsManualSelection] = useRecoilState(isManualSelectionState);
  // 맵 선택 시 호출될 함수
  const handleMapSelection = (selectedNum: number) => {
    setSelectedMap(selectedNum); // 선택된 맵 번호 설정
    setIsManualSelection(true); // 수동 선택으로 설정
    navigate(`/${selectedNum}`); // 선택된 맵으로 이동
  };

  return (
    <StyledWrapper>
        <Header/>
        <BackBtn />
        <Maps>
          <Map onClick={()=> handleMapSelection(1)} src="/images/homes/icons/1.png"/>
          <Map onClick={()=> handleMapSelection(2)} src="/images/homes/icons/2.png"/>
          <Map onClick={()=> handleMapSelection(3)} src="/images/homes/icons/3.png"/>
          <Map onClick={()=> handleMapSelection(4)} src="/images/homes/icons/4.png"/>
          <Map onClick={()=> handleMapSelection(5)} src="/images/homes/icons/5.png"></Map>
        </Maps>
    </StyledWrapper>
  )
}

export default SelectingMapPage;

const StyledWrapper = styled(Wrapper)`
  background-image: url("/images/homes/backgrounds/elevator.png");
  background-size: cover;
  background-position: center;
`;

const Map = styled.img`
  width: 55%;
  margin-bottom:3%;
  cursor: pointer;
`

const Maps= styled.div`
  width : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  padding: 10% 0;
`