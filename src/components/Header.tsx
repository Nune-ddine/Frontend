import styled from "styled-components"

const Header = () => {
  return (
    <Headers>
      <div>포인트</div>
      <div>눈사람 횟수</div>
      <div>마이페이지</div>
    </Headers>
  )
}

export default Header

const Headers = styled.div`
  width : 100%;
  height: 10%;

  border: 2px solid red;

  display: flex;
  flex-direction: row;
`