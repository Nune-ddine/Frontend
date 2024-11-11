import styled from "styled-components"

const Footer = () => {
  return (
    <Footers>
      <div>가챠 버튼</div>
      <div>눈사람 굴리기</div>
    </Footers>
  )
}

export default Footer

const Footers = styled.div`
height : 718px;
    width : 90%;
 display: flex;
 flex-direction: row;
`