import Header from '../components/Header'
import MakeImage from '../components/makeImage'
import styled from 'styled-components'
import Main from '../components/Main'

const makingPage = () => {
  return (
    <Wrapper>
      <Header/>
      <Main>
         <MakeImage/>
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
