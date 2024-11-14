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
    if (code && !token) {
      login(code); // 실제 로그인 함수 호출
    }
  }, [location, token]);

  return (
    <Wrapper>
      <Header/>
      <Main>
        {token ? (
          <MainLayout>
            <button onClick={()=> navigate('/gotcha')}>가챠</button>
            <button onClick={()=> navigate('/locating')}>눈사람 굴리기</button>
          </MainLayout>
        ) : (
          <LoginLayout>
            <button onClick={() => navigate('/login')}>카카오 로그인하기</button>
          </LoginLayout>
        )}
      </Main>


      <button onClick={() => navigate('/makingPage')}>Making Page</button>
      <button onClick={getMember}>Get Member Test</button>
      <button onClick={getGotcha}>Get Gotcha Test</button>
      <button onClick={patchMember}>Patch Member Test</button>
      <button onClick={getInventory}>Get Inventory Test</button>
      <button onClick={getAllSnowman}>Get All Snowman Test</button>
      <button onClick={getSnowmanQuiz}>Get Snowman Quiz Test</button>
  
    </Wrapper>
  );
};

export default HomePage;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  background-color: #6FABEB;
`;
const MainLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #FFDD00;
    border: none;
    border-radius: 5px;
  }
`;