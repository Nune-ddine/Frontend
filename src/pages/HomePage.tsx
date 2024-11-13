
import styled from 'styled-components';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import Main from '../components/Main';

const HomePage = () => {


  return (
    <Wrapper>
      <Header/>
      <Main>
        <></>
      </Main>
    </Wrapper>
  )
}

export default HomePage

export const Wrapper = styled.div`
  height : 100%;
  display : flex;
  flex-direction: column;
  justify-content : space-between;
  background-color : #6FABEB;
`
