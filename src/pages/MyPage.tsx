import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { deleteMySnowman, getMember, getMySnowman, patchUsername } from '../services/api/memberAPI';
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
  const [isEditing, setIsEditing] = useState<boolean>(false); // State for editing mode
  const [newUsername, setNewUsername] = useState<string>(''); // Temp username for edit

  const getProfile = async () => {
    try {
      const response: MemberResponse = await getMember(); 
      setImage(response.image);
      setUsername(response.username);
    } catch (error) {
      console.error("Failed to fetch member profile:", error);
    }
  };

  const getSnowman = async () => {
    try {
      const response: Snowman[] = await getMySnowman();
      console.log(response);
      setSnowmans(response);
    } catch (error) {
      console.error("Failed to get snowman data:", error);
    }
  };

  const editUsername = async () => {
    try {
      if (newUsername.length > 10) {
        alert("닉네임은 10글자 이내로 작성해주세요");
        }
      // 닉네임 ㄹㅇ 수정할건지 confirm
      const isConfirmed = confirm("닉네임을 변경하시겠어요?");
      if (!isConfirmed) {
        return;
      }
      await patchUsername(newUsername); // Pass newUsername to the API
      setUsername(newUsername); // Update UI with the new username
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const deleteSnowman = async (id: number) => {
    const isConfirmed = confirm("☃️ : 주인님 절 정말 녹이실건가요 ? 🥲");
    
    if (!isConfirmed) {
      return; // User clicked cancel, so we exit the function early
    }
  
    try {
      await deleteMySnowman(id);
      setSnowmans(snowmans.filter(snowman => snowman.id !== id)); // Remove the deleted snowman from the UI
    } catch (error) {
      console.error("Error occurred while deleting snowman:", error);
    }
  };
  
  useEffect(() => {
    getProfile();
    getSnowman();
  }, []);

  return (
    <Wrapper style={{ backgroundColor: "#F3F9FF" }}>
      <Header />
      <BackBtn />
      <ProfileSection>
        <ProfilePicture src={image} alt="Profile" />
        <ProfileName>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                style={{
                  border: "1px solid #FFF1D2",
                  borderRadius: "8px",
                  width:"80px",
                  height:"24px",
                  background:"#FFF1D2",
                  color:"rgba(81, 52, 33, 1)"
                }}
              />
              <Button onClick={editUsername}>
                저장
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </div>
          ) : (
            <>
            <OutName>
              {username} 
              <img
                src="/images/mypage/edit.png"
                style={{ width: "16px", marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                  setIsEditing(true);
                  setNewUsername(username); // Initialize input with the current username
                }}
              />
              </OutName>
            </>
          )}
        </ProfileName>
      </ProfileSection>
      <MainContent>
        <SnowmanContainer>
          {[...Array(3)].map((_, index) =>
            snowmans[index] ? (
              <Snowman key={snowmans[index].id}>
                <img
                  src={snowmans[index].image || '/images/mypage/emptySnowman.png'}
                  alt="Snowman"
                  style={{ 
                    height: "13rem",
                    width: "8rem",
                    objectFit: "cover",
                    // border:"1px solid black"
                  }}
                />
                <SnowmanText>
                  {snowmans[index].name || '눈사루를 만들어주세요'}
                  <img 
                    src='/images/mypage/trashcan.png'
                    style={{ height: "1.5rem", marginLeft: "0.6rem", cursor: "pointer" }}
                    onClick={() => deleteSnowman(snowmans[index].id)}
                  />
                </SnowmanText>
                <SnowmanCount>
                  {snowmans[index].correctCount}/{snowmans[index].incorrentCount + snowmans[index].correctCount}명
                </SnowmanCount>
              </Snowman>
            ) : (
              <Snowman key={index}>
                <img
                  src="/images/mypage/emptySnowman.png"
                  alt="Empty Snowman"
                  style={{ height: "12rem" }}
                />
                <SnowmanText>
                  안 굴린 눈사람
                </SnowmanText>
                <SnowmanCount>0/0명</SnowmanCount>
              </Snowman>
            )
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
  background-color : #F3F9FF;
  font-family: 'MaplestoryOTFBold';
`

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  height : 20%;
`;

const ProfilePicture = styled.img`
  /* width: 80px;
  height: 80px; */
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-size: auto;
  border: 1px solid #513421;
`;

const ProfileName = styled.div`
  background-color: #FFE2A4;
  border-radius: 100px;
  width: auto; 
  padding: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  gap : 2rem;
  border: 1px solid #513421;
  font-size: 1rem;
  color: #513421;
  div {
    background-color: #FFF1D2;
    border-radius: 100px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const Button = styled.button`
  background-color: #FFF1D2;
  color:rgba(81, 52, 33, 1);
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #E4F1FF;
  color : #513421;
  height : 100%;
  background-image: url("/images/mypage/background.png");  
  background-size: cover;
  background-position: center;
`;

const SnowmanContainer = styled.div`
  display: flex;
  // justify-content: center;
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
    margin-bottom: -80%; /* Adjust for overlap if needed */
  }
  &:nth-child(2){
    align-self: start;
  }
`;

const SnowmanText = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  display: flex;
  align-items : center;
  margin-bottom : 0.5rem;
`;

const SnowmanCount = styled.div`
  font-size: 1rem;
  padding : 0 0.8rem;
  border-radius: 26px;
  border: 1px solid #513421;
  background: #FFF1D2;
`;

const OutName = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5rem;

`;