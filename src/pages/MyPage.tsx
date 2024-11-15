import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { getMember, getMySnowman, patchUsername } from '../services/api/memberAPI';
import BackBtn from '../components/BackBtn';

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

  // const editUsername = async () => {
  //   try {
  //     const response = await patchUsername("누네띠네"); // username 인자를 추가
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error updating username:", error);
  //   }
  // };

  useEffect(() => {
    getProfile();
    getSnowman();
  }, []);

  return (
    <Wrapper style={{backgroundColor:"#f0f0f0"}}>
      <Header />
      <BackBtn/>
      <ProfileSection>
        <ProfilePicture src={image} alt="Profile" />
        <ProfileName>
          {name || "오유진"}
          <img src="/images/etc/edit.png" style={{width:"10px"}} onClick={editUsername}></img>
        </ProfileName>
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
    </Wrapper>
  );
};

export default MyPage;

export const Wrapper = styled.div`
  height : 100%;
  display : flex;
  flex-direction: column;
  justify-content : space-between;
  background-color : #F3F9FF;
  font-family: 'MaplestoryOTFBold';
`

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
  background-color: #FFE2A4;
  border-radius: 100px;
  width: auto; 
  padding: 10px;
  border: 1px solid #513421;
  font-size: 11px;
  color: #513421;
  div {
    background-color: #FFF1D2;
    border-radius: 100px;
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
  }
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