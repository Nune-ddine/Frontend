import styled from "styled-components"

const Header = () => {
  return (
    <Wrapper>
      <Point>Point</Point>
      <SnowmanCount>SnowmanCount</SnowmanCount>
      <MyPage>MyPage</MyPage>
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
const Point = styled.div`
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
const MyPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border: 2px solid yellow;
  border-radius: 100px;
`