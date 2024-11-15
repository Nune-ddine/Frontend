
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

  // getMemberTest
  // header에 토큰을 담아서 보내기
  const getMember = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/member", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get member test", error);
    }
  };

  const getGotcha = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/gatcha", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get gotcha test", error);
    }
  }

  // patchMemberTest
  // header에 토큰을 담아서 보내기
  const patchMember = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.patch("https://nuneddine.p-e.kr/api/v1/member/username", {
        username: "테스트 닉네임",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to patch member test", error);
    }
  };

  const getInventory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get inventory test", error);
    }
  };

  const getAllSnowman = async () => {
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/map/1");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch all snowman data", error);
    }
  };

  const getSnowmanQuiz = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/snowman/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get snowman quiz test", error);
    }
  };

  const createSnowman = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.post("https://nuneddine.p-e.kr/api/map/1/snowman", {
        name: "내눈사람3",
        color: "white",
        snowmanShape: "BASIC",
        image: "",
        snowmanItemRequests: [
            1, 2
        ],
        quiz: "맞춰보세요3",
        answerId: 1,
        content1: "선택지1",
        content2: "선택지2",
        content3: "선택지3",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); 
    } catch (error) {
      console.error("Failed to create snowman", error);
    }
  };


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
          <div onClick={() => navigate('/login')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img src='images/homes/kakaoLogin.png' alt="카카오 로그인하기" style={{ marginRight: '8px' , height :"24px"}} />
          </div>
        </LoginLayout>
        
        )}
      <button onClick={() => navigate('/making')}>Making Page</button>
      <button onClick={getMember}>Get Member Test</button>
      <button onClick={getGotcha}>Get Gotcha Test</button>
      <button onClick={patchMember}>Patch Member Test</button>
      <button onClick={getInventory}>Get Inventory Test</button>
      <button onClick={getAllSnowman}>Get All Snowman Test</button>
      <button onClick={getSnowmanQuiz}>Get Snowman Quiz Test</button>
      <button onClick={createSnowman}>Create Snowman Test</button>
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
  margin-top: 20px;
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #FFDD00;
    border: none;
    border-radius: 5px;
  }
`;