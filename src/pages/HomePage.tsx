
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
      navigate(`/locating${location.pathname}`);
    }else{
      alert("이미 3명의 눈사람을 만들었어요! 새로운 눈사람을 만들고 싶다면 마이페이지에서 눈사람을 녹여야해요 🥲"); 
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
          <div onClick={() => handleLoginClick()}>
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

  // getMemberTest
  // header에 토큰을 담아서 보내기
  // const getMember = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/member", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to get member test", error);
  //   }
  // };

  // const getGotcha = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/gotcha", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to get gotcha test", error);
  //   }
  // }

  // // patchMemberTest
  // // header에 토큰을 담아서 보내기
  // const patchMember = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.patch("https://nuneddine.p-e.kr/api/v1/member/username", {
  //       username: "테스트 닉네임",
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to patch member test", error);
  //   }
  // };

  // const getInventory = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/inventory", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to get inventory test", error);
  //   }
  // };

  // const getAllSnowman = async () => {
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/map/1");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch all snowman data", error);
  //   }
  // };

  // const getSnowmanQuiz = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/snowman/1", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to get snowman quiz test", error);
  //   }
  // };

  // const createSnowman = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post("https://nuneddine.p-e.kr/api/v1/map/1/snowman", {
  //       name: "수쨩테스트",
  //       image: "이미지링크",
  //       posX: 2,
  //       posY: 3,
  //       quiz: "퀴즈",
  //       answerId: 3,
  //       content1: "보기1",
  //       content2: "보기2",
  //       content3: "보기3"
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data); 
  //   } catch (error) {
  //     console.error("Failed to create snowman", error);
  //   }
  // };

  // const getMySnowmans = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/my-snowman", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to get my snowmans", error);
  //   }
  // }

  // const getSnowmanInfo = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("https://nuneddine.p-e.kr/api/v1/snowman/detail/1", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to get snowman info", error);
  //   }
  // }

  // const trySnowmanQuiz = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("Token not found");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post("https://nuneddine.p-e.kr/api/v1/snowman/2", {
  //       number: 1
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Failed to try snowman quiz", error);
  //   }
  // }

