import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Locator from "../services/locator";
import closeBtn from "../../public/buttons/closeBtn.png"
import { Wrapper } from "./MyPage";
const LocatingPage = () => {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate("/");
  };
  
  
  return (
    <Wrapper>
      <Header/>
      <Locator/>
      <Wrapper style={{height:"10%", alignItems:"center"}}>
        <Button>
          눈사람 만들 곳을 클릭해주세요!
          <CloseBtn onClick={goHome}>X</CloseBtn>
        </Button>
      </Wrapper>
    </Wrapper>
  );
};

export default LocatingPage;

// export const Wrapper = styled.div`
//   height : 100%;
//   display : flex;
//   flex-direction: column;
//   justify-content : space-between;
//   align-items: center;
//   background-color : #6FABEB;
// `
const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  border: 1px solid #513421;
  border-radius: 100px;
  color : #5DABF5;
  background-color: #DCEEFF;
  padding: 3%;
  gap : 10px;
  font-family: 'MaplestoryOTFBold';
  font-size : 20px;
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  width : 26px;
  height: 26px;
  color : #513421;
  border-radius: 100px;
  background-color : #FFF1D2;
  border: 1px solid #513421;
`
