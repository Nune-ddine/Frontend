import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMember } from "../services/api/memberAPI";
import { useEffect, useState } from "react";
import { logout } from "../services/api/loginAPI";
import { useHeader } from "../contexts/HeaderContext";

const Header = () => {
  const navigate = useNavigate();

  // point와 chance 상태
  const [point, setPoint] = useState<number>(0);
  const [chance, setChance] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // 인증 상태
  const { reloadHeader } = useHeader();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false); // 토큰이 없으면 인증 상태를 false로 설정
      return;
    }

    // 토큰이 있을 경우에만 getMember 호출
    getMember().then((res) => {
      setPoint(res.point);
      setChance(res.chance);
    }).catch((error) => {
      console.error("Failed to fetch member data:", error);
    });
  }, [reloadHeader]);

  return (
    <Wrapper>
      {/* Left 부분을 조건부 렌더링 */}
      {isAuthenticated && (
        <Left>
          <Button>
            <img src="/images/etc/pointBtn.png" alt="point" />
            <Text>{point}p</Text>
          </Button>
          <Button>
            <img src="/images/etc/questionmarkBtn.png" alt="quizChance" />
            <Text>{chance}/10</Text>
          </Button>
        </Left>
      )}
      {isAuthenticated && (
        <>
        <MyPageBtn onClick={() => logout()} src="/images/etc/logoutBtn.png" alt="logout" />
        <MyPageBtn onClick={() => navigate('/mypage')} src="/images/etc/mypageBtn.png" alt="mypage" />
      </>
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  // position: fixed;
  top: 0;
  width : 100%;
  height: 7%;

  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Maplestory-Bold', sans-serif;
`
const Button = styled.div`
  background-color: #C2E1FF;
  border: 1px solid #513421;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-radius: 100px;

  img {
    height:70%;

  }
`
const MyPageBtn = styled.img`
  height: 100%;
  width: auto;
  padding-right: 10px;
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 80%;
  height: 100%;

`

const Text = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF1D2;
  border: 1px solid #513421;
  border-radius: 100px;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 1px 2px 0px 0px #7EBFFF;
  color: rgba(81, 52, 33, 1);
  font-size: 0.9rem;
`