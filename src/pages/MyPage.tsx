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
      // console.log(response);
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
        <div style={{height:"20%",width:"100%", background:"grey"}}>그래픽 자리</div>
      <SnowmanContainer>
        {[...Array(3)].map((_, index) => (
          snowmans[index] ? (
            <Snowman key={snowmans[index].id}>
              <img
                src={snowmans[index].image || '/images/mypage/emptySnowman.png'}
                alt="Snowman"
                
              />
              <SnowmanText>{snowmans[index].name || '눈사람을 만들어주세요'}</SnowmanText>
              <SnowmanCount>
                {snowmans[index].correctCount}/{snowmans[index].incorrentCount}명
              </SnowmanCount>
            </Snowman>
          ) : (
            <Snowman key={index}>
              <img
                src='/images/mypage/emptySnowman.png'
                alt="Empty Snowman"
                style={{ width: '80%'}}
              />
              <SnowmanText>
                눈사람 <img src='/images/mypage/edit.png' style={{width:"12px"}}/> 
              </SnowmanText>
              <SnowmanCount>0/0명</SnowmanCount>
            </Snowman>
          )
        ))}
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
  // justify-content : space-between;
  gap : 3%;
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
  border: 1px solid #513421;
`;

const ProfileName = styled.div`
  background-color: #FFE2A4;
  border-radius: 100px;
  width: auto; 
  padding: 10px;
  gap : 10px;
  border: 1px solid #513421;
  font-size: 1rem;
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
  background: #E4F1FF;
  color : #513421;
  height : 80%;
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
  position: relative;
  margin-top : 10%;
  &:nth-child(1),
  &:nth-child(3)  {
    align-self: center;
    margin-bottom: -60%; /* Adjust for overlap if needed */
  }

  &:nth-child(2){
    align-self: start;
  }
`;

const SnowmanText = styled.div`
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SnowmanCount = styled.div`
  font-size: 0.8rem;
  color: #666;
`;