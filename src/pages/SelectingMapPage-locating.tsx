import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Wrapper } from "./MyPage"
import styled from "styled-components";
import BackBtn from "../components/BackBtn";

const SelectingMapPage2 = () => {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
        <Header/>
        <BackButton src="/images/etc/leftBtn.png" onClick={() => navigate('/locating')}/>
        <Maps>
          <Map onClick={()=> navigate('/locating/1')} src="/images/homes/icons/1.png"/>
          <Map onClick={()=> navigate('/locating/2')} src="/images/homes/icons/2.png"/>
          <Map onClick={()=> navigate('/locating/3')} src="/images/homes/icons/3.png"/>
          <Map onClick={()=> navigate('/locating/4')} src="/images/homes/icons/4.png"/>
          <Map onClick={()=> navigate('/locating/5')} src="/images/homes/icons/5.png"/>
        </Maps>
    </StyledWrapper>
  )
}

export default SelectingMapPage2;

const StyledWrapper = styled(Wrapper)`
  background-image: url("/images/homes/backgrounds/elevator.png");
  background-size: cover;
  background-position: center;
`;

const Map = styled.img`
  width: 55%;
  margin-bottom:3%;
`

const Maps= styled.div`
  width : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  padding: 10% 0;
`
const BackButton = styled.img`
  // padding-bottom: 15px;
  margin-left : 1rem;
  // margin-top : 1rem;
  height: 5%;
  width: 9%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;