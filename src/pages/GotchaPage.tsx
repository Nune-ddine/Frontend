import styled from "styled-components";
import image from "../../public/images/gotchas/gotcha.png";
import { Wrapper } from "./HomePage";
import Header from "../components/Header";
import Gotcha from "../components/GotchaPage/Gotcha";

const GotchaPage = () => {
  return (
    <Wrapper>
        <Header></Header>
        <Image src={image} alt="gotcha" />
        <Gotcha/>
    </Wrapper>
  );
}

export default GotchaPage;

export const Image = styled.img`
    width : 100%;
    height : 90%;
`
