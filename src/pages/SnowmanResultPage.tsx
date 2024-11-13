import styled from "styled-components"
import SnowmanResult from "../components/snowmanResultPage/SnowmanResult"
import ResultButtons from "../components/snowmanResultPage/ResultButtons"

const SnowmanResultPage = () => {
return (
   <Wrapper>
      <SnowmanResult />
      <ResultButtons />
   </Wrapper>
)
}

export default SnowmanResultPage

const Wrapper = styled.div`
   width : 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`
