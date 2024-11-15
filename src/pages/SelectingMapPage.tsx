import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Wrapper } from "./MyPage"
import styled from "styled-components";
import BackBtn from "../components/BackBtn";

const SelectingMapPage = () => {
    const navigate = useNavigate();

  return (
    <Wrapper>
        <Header/>
        <BackBtn/>
        <Map src="/images/homes/map.png" style={{ top: "20%", left: "10%" }}/>
        <Map src="/images/homes/map.png" style={{ top: "30%", right: "10%" }}/>
        <Map src="/images/homes/map.png" style={{ top: "40%", left: "10%" }}/>
        <Map src="/images/homes/map.png" style={{ top: "50%", right: "10%" }}/>
        <Map src="/images/homes/map.png" style={{ top: "60%", left: "10%" }}/>
    </Wrapper>
  )
}

export default SelectingMapPage;

const Map = styled.img`
position: absolute;
width : 35%;
`