
import styled from 'styled-components';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import Main from '../components/Main';
import { useEffect } from 'react';
import { login } from '../services/login';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 쿼리 파라미터로 전달된 code 추출
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    // code가 있고, localStorage에 token이 없을 때만 로그인 함수 호출
    if (code && !localStorage.getItem("token")) {
      login(code); // 실제 로그인 함수 호출
    }
  }, [location]);

  return (
    <Wrapper>
      <Header/>
      <Main/>
      <button onClick={() => navigate('/makingPage')}>Making Page</button>
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
`
