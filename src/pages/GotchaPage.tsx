import styled from "styled-components";
import Header from "../components/Header";
import{ Wrapper } from "./MyPage";
import BackBtn from "../components/BackBtn";
import Gotcha from "../components/GotchaPage/Gotcha";

const GotchaPage = () => {
  return (
    <Wrapper style={{background:"white"}}>
        <Header/>
        <BackBtn/>
        <Gotcha/>
    </Wrapper>
  );
}

export default GotchaPage;

export const Image = styled.img`
    width : 100%;
    height : 90%;
`
