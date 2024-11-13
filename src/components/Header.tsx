import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <PointBtn>Point</PointBtn>
      <SnowmanCount>SnowmanCount</SnowmanCount>
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
`
const PointBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border: 2px solid blue;
  border-radius: 100px;
`
const SnowmanCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border: 2px solid green;
  border-radius: 100px;
`
const MyPageBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border: 2px solid yellow;
  border-radius: 100px;
`