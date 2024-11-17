import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { MainLayout } from "./HomePage";
import BackgroundWrapper from "../components/HomePage/BackgroundWrapper";
import Locator from "../services/locator";
const LocatingPage = () => {
  const navigate = useNavigate();
  
  return (
    <BackgroundWrapper>
      <Header/>
      <Locator />
      <MainLayout>
            <img src='/images/homes/gotchaBtn.png' style={{width:"20%"}} onClick={()=> navigate('/gotcha')}></img>
            <img src='/images/homes/letterWood2.png' style={{width:"36%"}} onClick={()=> navigate(`/making`)}></img>
      </MainLayout>
      {/* <Wrapper style={{height:"15%", alignItems:"center", justifyContent:"center" }}>
        <Button>
          눈사람 만들 곳을 클릭해주세요!
          <img onClick={()=>navigate(`/${id}`)} src="/images/etc/closeBtn.png" style={{width:"30px", height:"30px"}}/>
        </Button>
      </Wrapper> */}
    </BackgroundWrapper>
  );
};

export default LocatingPage;

const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  border: 1px solid #513421;
  border-radius: 100px;
  color : #5DABF5;
  background-color: #DCEEFF;
  padding: 3% 0;
  gap : 10px;
  font-family: 'MaplestoryOTFBold';
  font-size : 1.6rem;
  // margin-bottom : 4rem;
`;