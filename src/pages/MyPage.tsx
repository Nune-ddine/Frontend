import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { getMember, getMySnowman, patchUsername } from '../services/api/memberAPI';

interface MemberResponse {
  image: string;
  name: string;
}

interface Snowman {
  id: number;
  name: string | null;
  image: string;
  correctCount: number;
  incorrectCount: number;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [snowmans, setSnowmans] = useState<Snowman[]>([]);

  const goHome = () => {
    navigate("/");
  };

  const getProfile = async () => {
    try {
      const response: MemberResponse = await getMember(); // response 타입 명시
      setImage(response.image);
      setName(response.name);
    } catch (error) {
      console.error("Failed to fetch member profile:", error);
    }
  };

  const getSnowman = async () => {
    try {
      const response: Snowman[] = await getMySnowman(); // response 타입 명시
      setSnowmans(response);
    } catch (error) {
      console.error("Failed to fetch snowman data:", error);
    }
  };

  const editUsername = async () => {
    try {
      const response = await patchUsername("누네띠네"); // username 인자를 추가
      console.log(response);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  useEffect(() => {
    getProfile();
    getSnowman();
  }, []);

  return (
    <Container>
      <Header />
      <BackButton onClick={goHome}>◀</BackButton>
      <ProfileSection>
        <ProfilePicture src={image} alt="Profile" />
        <ProfileName>{name}</ProfileName>
        <div onClick={editUsername}>✏️</div>
      </ProfileSection>
      <MainContent>
        <SnowmanContainer>
          {snowmans.map((snowman) => {
            const totalCount = snowman.correctCount + snowman.incorrectCount;
            return (
              <Snowman key={snowman.id}>
                <SnowmanText>{snowman.name || "Unknown Snowman"}</SnowmanText>
                <SnowmanCount>
                  {snowman.correctCount}/{totalCount}명
                </SnowmanCount>
              </Snowman>
            );
          })}
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

export const BackButton = styled.button`
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