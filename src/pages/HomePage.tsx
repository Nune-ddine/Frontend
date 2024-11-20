import styled from 'styled-components';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { handleLoginClick, login } from '../services/api/loginAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Snowmans from '../components/HomePage/Snowmans';
import BackgroundWrapper from '../components/HomePage/BackgroundWrapper';
import { getMySnowman } from '../services/api/memberAPI';
import { useHeader } from '../contexts/HeaderContext';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const firstLogin = localStorage.getItem("firstLogin");
  const [snownumber, setSnownumber] = useState(0);
  const { triggerReload, reloadHeader } = useHeader();
  const { id } = useParams();

  useEffect(() => {
    if(firstLogin == "true"){
      navigate("/onboarding/1");
    }
    // URL에서 쿼리 파라미터로 전달된 code 추출
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    // code가 있고, localStorage에 token이 없을 때만 로그인 함수 호출
    if (code && !localStorage.getItem("token")) {
      login(code); // 실제 로그인 함수 호출
      // 로그인 후 화면 새로고침
    } 
    if (location.pathname === "/") {
      navigate("/1", { replace: true });
    } 
    const numericId = Number(id);
    if(numericId>5){
      navigate("/1", { replace: true });
    }
  }, [location]);

  useEffect(() => {
    getMySnowman().then((res) => {
      setSnownumber(res.length);
      // console.log(snownumber);
    });
  }
  , [reloadHeader]);

  const doyouwantTobuildAsnowman = () => {
    if(snownumber < 3){
      navigate(`/locating${location.pathname}`);
    }else{
      alert("이미 3명의 눈사람을 만들었어요! 새로운 눈사람을 만들고 싶다면 마이페이지에서 눈사람을 녹여야해요 🥲");
      // alert("이미 3명의 눈사람을 만들었어요! 하지만 누네띠네는 기회 한 번 더");
      // navigate(`/locating${location.pathname}`);
    }
  }

  return (
    <BackgroundWrapper>
      <Header/>
        <Snowmans/>
      {token ? (
          <MainLayout>
            <img src='/images/homes/gotchaBtn.png' style={{width:"20%"}} onClick={()=> navigate('/gotcha')}></img>
            <img src='/images/homes/letterWood.png' style={{width:"36%"}} onClick={doyouwantTobuildAsnowman}></img>
          </MainLayout>
        ) : (
        <LoginLayout>
          <KakaoBtn onClick={() => handleLoginClick()}>
            카카오로 로그인하기 
          </KakaoBtn>
        </LoginLayout>
        )}
    </BackgroundWrapper>
  )
}

export default HomePage

export const MainLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height : 15%;

  img {
    cursor: pointer;
  }
`;
export const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height : 15%;
  margin-top: 5%;
  margin-bottom: 5%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    cursor: pointer;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #FFDD00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const KakaoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 60%;
  cursor: pointer;
  border: 1.4px solid #513421;
  border-radius: 40px;
  color: #513421;
  font-size: 1.3rem;
  background-color: #FFE432;
`;