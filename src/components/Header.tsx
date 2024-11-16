import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Left>
        <Button>
          <img src="/images/etc/pointBtn.png" alt="point" />
          <Text>1224p</Text>
        </Button>
        <Button>
          <img onClick={() => navigate('/making')} src="/images/etc/questionmarkBtn.png" alt="quizChance" />
          <Text>1 / 3</Text>
        </Button>
      </Left>
      <MyPageBtn onClick={() => navigate('/myPage')}>
      </MyPageBtn>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  // position: fixed;
  top: 0;
  width : 100%;
  height: 6.5%;

  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Maplestory-Bold', sans-serif;
`
const Button = styled.div`
  background-color: #C2E1FF;
  border: 1px solid #513421;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-radius: 100px;

  img {
    height:70%;
    
  }
`
const MyPageBtn = styled.button`
  background-image: url('/images/etc/mypageBtn.png');
  background-size: cover;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  height: 100%;
  aspect-ratio: 1/1;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 80%;
  height: 100%;

`

const Text = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF1D2;
  border: 1px solid #513421;
  border-radius: 100px;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 1px 2px 2px rgba(0, 60, 116, 0.25);

`