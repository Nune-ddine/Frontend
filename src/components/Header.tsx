import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <PointBtn>1224 p</PointBtn>
      <QuizChance>1 / 3</QuizChance>
      <MyPageBtn onClick={() => navigate('/myPage')}>MyPage</MyPageBtn>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  width : 100%;
  height: 7%;

  border: 2px solid red;
  box-sizing: border-box;
  padding: 10px;
  gap: 10px;

  display: flex;
  flex-direction: row;
  font-family: 'Maplestory-Bold', sans-serif;
`
const PointBtn = styled.div`
  background-color: #C2E1FF;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-radius: 100px;
`
const QuizChance = styled.div`
  background-color: #C2E1FF;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-radius: 100px;
`
const MyPageBtn = styled.button`
  background-image: url('/images/etc/');
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-radius: 100px;
`