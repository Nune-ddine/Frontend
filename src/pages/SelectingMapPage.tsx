import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Wrapper } from "./MyPage"
import styled from "styled-components";
import BackBtn from "../components/BackBtn";

const SelectingMapPage = () => {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
        <Header/>
        <BackBtn />
        <Maps>
          <Map onClick={()=> navigate('/1')} src="/images/homes/icons/1.png"/>
          <Map onClick={()=> navigate('/2')} src="/images/homes/icons/2.png"/>
          <Map onClick={()=> navigate('/3')} src="/images/homes/icons/3.png"/>
          <Map onClick={()=> navigate('/4')} src="/images/homes/icons/4.png"/>
          <Map onClick={()=> navigate('/5')} src="/images/homes/icnos/5.png"/>
        </Maps>
        {/* <Map onClick={()=> navigate('/1')} src="/images/homes/map.png" style={{ top: "20%", left: "10%" }}/>
        <Map onClick={()=> navigate('/2')} src="/images/homes/map.png" style={{ top: "30%", right: "10%" }}/>
        <Map onClick={()=> navigate('/3')} src="/images/homes/map.png" style={{ top: "40%", left: "10%" }}/>
        <Map onClick={()=> navigate('/4')} src="/images/homes/map.png" style={{ top: "50%", right: "10%" }}/>
        <Map onClick={()=> navigate('/5')} src="/images/homes/map.png" style={{ top: "60%", left: "10%" }}/> */}
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