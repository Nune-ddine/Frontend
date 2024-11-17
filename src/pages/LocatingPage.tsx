import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import closeBtn from "../../public/buttons/closeBtn.png"
import { Wrapper } from "./MyPage";
import { MainLayout } from "./HomePage";
import Locator from "../services/locator";
const LocatingPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  
  return (
    <Wrapper>
      <Header/>
      <Locator>
        
      </Locator>
      <MainLayout>
            <img src='/images/homes/gotchaBtn.png' style={{width:"20%"}} onClick={()=> navigate('/gotcha')}></img>
            <img src='/images/homes/letterWood.png' style={{width:"36%"}} onClick={()=> navigate(`/making`)}></img>
      </MainLayout>
      {/* <Wrapper style={{height:"15%", alignItems:"center", justifyContent:"center" }}>
        <Button>
          눈사람 만들 곳을 클릭해주세요!
          <img onClick={()=>navigate(`/${id}`)} src="/images/etc/closeBtn.png" style={{width:"30px", height:"30px"}}/>
        </Button>
      </Wrapper> */}
    </Wrapper>
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