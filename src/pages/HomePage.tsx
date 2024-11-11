
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {


  return (
    <Dom>
      <Header/>
      <Footer/>
    </Dom>
  )
}

export default HomePage

const Dom = styled.div`
  height : 100%;
  display : flex;
  flex-direction: column;
  justify-content : space-between;
  background-color : #6FABEB;
`
