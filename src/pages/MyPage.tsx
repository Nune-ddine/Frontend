import React from 'react';
import styled from 'styled-components';
import UserImage from './UserImage.jpg'; // Replace with the actual path to the image

const MyPage = () => {
  return (
    <Container>
      <Header>
        <BackButton>◀</BackButton>
        <TitleSection>
          <ToggleButton>1224p</ToggleButton>
          <Counter>1/3</Counter>
        </TitleSection>
        <PageLink>마이페이지</PageLink>
      </Header>
      <ProfileSection>
        <ProfilePicture src={UserImage} alt="Profile" />
        <ProfileName>오유진</ProfileName>
      </ProfileSection>
      <MainContent>
        <Drawing>❄️</Drawing>
        <Drawing>🎄</Drawing>
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

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
`;

const TitleSection = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 1rem;
`;

const Counter = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 0.5rem 1rem;
`;

const PageLink = styled.div`
  font-size: 0.9rem;
  color: #888;
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

const Drawing = styled.div`
  font-size: 3rem;
  margin: 1rem 0;
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

