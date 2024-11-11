import Header from '../components/Header'
// import MakeImage from '../components/MakeImage'
import styled from 'styled-components'
import Main from '../components/Main'
import SnowmanPart from '../components/makingPage/SnowmanPart'
import OptionPart from '../components/makingPage/OptionPart'

const makingPage = () => {
  return (
    <Wrapper>
      <Header/>
      <Main>
        <SnowmanPart/>
        <OptionPart/>
      </Main>
    </Wrapper>
  )
}

export default makingPage

const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;

   /* border: 1px solid #ee00ff; */
`
