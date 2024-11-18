
import styled from 'styled-components';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { handleLoginClick, login } from '../services/api/loginAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import Snowmans from '../components/HomePage/Snowmans';
import BackgroundWrapper from '../components/HomePage/BackgroundWrapper';
import { getMySnowman } from '../services/api/memberAPI';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [snownumber, setSnownumber] = useState(0);

  useEffect(() => {
    // URL에서 쿼리 파라미터로 전달된 code 추출
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    // code가 있고, localStorage에 token이 없을 때만 로그인 함수 호출
    if (code && !localStorage.getItem("token")) {
      login(code); // 실제 로그인 함수 호출
    }
    if (location.pathname === "/") {
      navigate("/1", { replace: true });
    } 
  }, [location, token]);

  useEffect(() => {
    getMySnowman().then((res) => {
      setSnownumber(res.length);
      console.log(snownumber);
    });
  }
  , []);

  const doyouwantTobuildAsnowman = () => {
    if(snownumber < 3){
      alert("이미 3명의 눈사람을 만들었어요! 새로운 눈사람을 만들고 싶다면 마이페이지에서 눈사람을 녹여야해요 🥲");
    }else{
      navigate(`/locating${location.pathname}`);
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
            {/* 카카오 로그인하기  */}
            <img src='images/homes/kakaoLogin.png' alt="카카오 로그인하기" style={{ marginRight: '8px' , width :"90%"}} />
          </KakaoBtn>
        </LoginLayout>
        )}
      {/* <button onClick={() => navigate('/making')}>Making Page</button>
      <button onClick={getMember}>Get Member Test</button>
      <button onClick={getGotcha}>Get Gotcha Test</button>
      <button onClick={patchMember}>Patch Member Test</button>
      <button onClick={getInventory}>Get Inventory Test</button>
      <button onClick={getAllSnowman}>Get All Snowman Test</button>
      <button onClick={getSnowmanQuiz}>Get Snowman Quiz Test</button>
      <button onClick={createSnowman}>Create Snowman Test</button>
      <button onClick={getMySnowmans}>Get My Snowmans Test</button>
      <button onClick={getSnowmanInfo}>Get Snowman Info Test</button>
      <button onClick={trySnowmanQuiz}>Try Snowman Quiz Test</button> */}
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
  /* display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 60%;
  cursor: pointer;
  border: 1.8px solid #3b3b3bfd;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  background-color: #3b3b3bfd; */
`;