import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import shape_triple from '../../public/images/items/shape/shape_triple.png'
import { getMember } from '../services/memberAPI';

const MyPage = () => {
  const navigate = useNavigate();
  const [profileimage, setProfileimage] = useState([]);
  
  const goHome = () => {
    navigate("/");
  };
  
  const getProfile = async() => {
    try {
      const response = await getMember();
      const profileimage = response.image;
      setProfileimage(profileimage);
    }catch (error) {
      console.error();
    }
  }

  useEffect(() => {
    getProfile();
  },[])

  return (
    <Container>
      <Header />
      <BackButton onClick={goHome}>◀</BackButton>
      <ProfileSection>
        <ProfilePicture src={shape_triple} alt="Profile" />
        <ProfileName>오유진</ProfileName>
      </ProfileSection>
      <MainContent>
        <SnowmanContainer>
          <Snowman>
            <SnowmanText>오유진 눈사람</SnowmanText>
            <SnowmanCount>12/30명</SnowmanCount>
          </Snowman>
          <Snowman>
            <SnowmanText>오유진 눈사람</SnowmanText>
            <SnowmanCount>12/30명</SnowmanCount>
          </Snowman>
          <Snowman>
            <SnowmanText>오유진 눈사람</SnowmanText>
            <SnowmanCount>12/30명</SnowmanCount>
          </Snowman>
        </SnowmanContainer>
      </MainContent>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
`;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
//   background-color: #ffffff;
// `;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-size: auto;
`;

const ProfileName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const SnowmanContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Snowman = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 50%;
  width: 80px;
  height: 120px;
  margin: 1rem;
  padding: 0.5rem;
`;

const SnowmanText = styled.div`
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SnowmanCount = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

