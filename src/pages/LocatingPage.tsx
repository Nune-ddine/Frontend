import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "./HomePage";
import Locator from "../services/Locator";



const LocatingPage = () => {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate("/");
  };
  
  
  return (
    <Wrapper>
      <Locator/>
      <Button>
        눈사람 만들 곳을 클릭해주세요!
        <div onClick={goHome}>x</div>
      </Button>
    </Wrapper>
  );
};

export default LocatingPage;

const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  border-radius: 100px;
  background-color: white;
  padding: 3%;
  gap : 10px;
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
`;

