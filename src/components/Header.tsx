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
 display: flex;
 flex-direction: row;
`