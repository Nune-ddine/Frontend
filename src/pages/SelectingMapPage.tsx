import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { BackButton, Wrapper } from "./MyPage"
import styled from "styled-components";

const SelectingMapPage = () => {
    const navigate = useNavigate();

  return (
    <Wrapper>
        <Header/>
        <BackButtonStyled onClick={()=> navigate('/')}>◀</BackButtonStyled>
        <Map src="/images/etc/map.png" style={{ top: "20%", left: "10%" }}/>
        <Map src="/images/etc/map.png" style={{ top: "30%", right: "10%" }}/>
        <Map src="/images/etc/map.png" style={{ top: "40%", left: "10%" }}/>
        <Map src="/images/etc/map.png" style={{ top: "50%", right: "10%" }}/>
        <Map src="/images/etc/map.png" style={{ top: "60%", left: "10%" }}/>
    </Wrapper>
  )
}

export default SelectingMapPage;

const BackButtonStyled = styled(BackButton)`
  position: relative;
  y-index: 0;
`;

const Map = styled.img`
position: absolute;
width : 35%;
`