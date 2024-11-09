import React from 'react'
import styled from 'styled-components';
import Header from '../components/Header';

const HomePage = () => {


  return (
    <Background>
      <Header/>
    </Background>
  )
}

export default HomePage

const Background = styled.div`
 background-color : gray;
`
