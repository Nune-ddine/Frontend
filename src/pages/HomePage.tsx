
import styled from 'styled-components';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import Main from '../components/Main';
import { useEffect } from 'react';
import { login } from '../services/login';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    // URL에서 쿼리 파라미터로 전달된 code 추출
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    // code가 있고, localStorage에 token이 없을 때만 로그인 함수 호출
    if (code && !localStorage.getItem("token")) {
      login(code); // 실제 로그인 함수 호출
    }
  }, [location, token]);

  return (
    <Wrapper>
      <Header/>
      <Main>
        <img onClick={() => navigate('/elevator')} src='images/homes/map.png' style={{width:"24%"}}></img>
      </Main>
      {token ? (
          <MainLayout>
            <img src='images/homes/gotchaBtn.png' style={{width:"20%"}} onClick={()=> navigate('/gotcha')}></img>
            <img src='images/homes/letterWood.png' style={{width:"36%"}} onClick={()=> navigate('/locating')}></img>
          </MainLayout>
        ) : (
        <LoginLayout>
          <div onClick={() => navigate('/login')}>
            <img src='images/homes/kakaoLogin.png' alt="카카오 로그인하기" style={{ marginRight: '8px' , width :"90%"}} />
          </div>
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
    </Wrapper>
  )
}

export default HomePage

const Wrapper = styled.div`
  height : 100%;
  display : flex;
  flex-direction: column;
  justify-content : space-between;
  background-color : #6FABEB;
  font-family: 'MaplestoryOTFBold';
`
const MainLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height : 15%;
`;
const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
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
