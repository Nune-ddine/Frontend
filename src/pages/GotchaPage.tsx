import styled from "styled-components";
import Header from "../components/Header";
import Gotcha from "../components/GotchaPage/Gotcha";
import { Wrapper } from "./MyPage";
import BackBtn from "../components/BackBtn";

const GotchaPage = () => {
  return (
    <Wrapper>
        <Header/>
        <BackBtn/>
        <img src='images/etc/gotcha.png' alt="gotcha" />
        <Gotcha/>
    </Wrapper>
  );
}

export default GotchaPage;

export const Image = styled.img`
    width : 100%;
    height : 90%;
`
