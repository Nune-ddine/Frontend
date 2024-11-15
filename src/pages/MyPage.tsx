import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { getMember, getMySnowman, patchUsername } from '../services/api/memberAPI';
import BackBtn from '../components/BackBtn';

interface MemberResponse {
  image: string;
  username: string;
}

interface Snowman {
  id: number;
  name: string | null;
  image: string;
  correctCount: number;
  incorrentCount: number; 
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [snowmans, setSnowmans] = useState<Snowman[]>([]);

  const getProfile = async () => {
    try {
      const response: MemberResponse = await getMember(); // response 타입 명시
      setImage(response.image);
      setUsername(response.username);
      // console.log(response);
    } catch (error) {
      console.error("Failed to fetch member profile:", error);
    }
  };

  const getSnowman = async () => {
    try {
      const response: Snowman[] = await getMySnowman(); // response 타입 명시
      console.log(response);
      setSnowmans(response);
    } catch (error) {
      console.error("Failed to fetch snowman data:", error);
    }
  };

  const editUsername = async () => {
    try {
      const response = await patchUsername(); // username 인자를 추가
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
    <Wrapper style={{backgroundColor:"#f0f0f0"}}>
      <Header />
      <BackBtn/>
      <ProfileSection>
        <ProfilePicture src={image} alt="Profile" />
        <ProfileName>
          {username}
          <img src="/images/mypage/edit.png" style={{width:"16px"}} onClick={editUsername}></img>
        </ProfileName>
      </ProfileSection>
      <MainContent>
      <SnowmanContainer>
        {snowmans.length > 0 && snowmans[0] ? (
          <Snowman key={snowmans[0].id}>
            <img
              src={snowmans[0].image || '/images/mypage/emtpySnowman.png'}
              alt="Snowman"
              style={{ width: '50px', height: '50px' }}
            />
            <SnowmanText>{snowmans[0].name || 'Unnamed Snowman'}</SnowmanText>
            <SnowmanCount>
              {snowmans[0].correctCount}/{snowmans[0].incorrentCount}명
            </SnowmanCount>
          </Snowman>
        ) : (
          <div>No snowman data available</div>
        )}
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
  gap : 10px;
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