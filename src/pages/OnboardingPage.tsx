import styled from "styled-components";
import OnboardingWrapper from "../components/HomePage/OnboardingWrapper";
import { useNavigate, useParams } from "react-router-dom";

const OnboardingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    const numericId = Number(id);
    if (numericId > 1) {
      navigate(`/onboarding/${numericId - 1}`);
    }
  };

  const handleNextClick = () => {
    const numericId = Number(id);
    if (numericId < 6) {
      navigate(`/onboarding/${numericId + 1}`);
      localStorage.setItem("firstLogin", "false");
    }
  };

  return (
    <OnboardingWrapper>
      <ButtonContainer>
        {id === "1" && <NoButton />}
        {id !== "1" && id !== "6" && (
          <BackBtn
           src="/images/etc/leftBtn.png" 
           onClick={handleBackClick} 
           style={{height:"24%"}}
          />
        )}
        {id !== "6" && (
          <NextBtn src="/images/etc/rightBtn.png"
           style={{height:"24%"}}
           onClick={handleNextClick} />
        )}
        {id === "6" && (
          <Button onClick={() => navigate("/1")}>눈사람 굴리러 가기</Button>
        )}
      </ButtonContainer>
    </OnboardingWrapper>
  );
};

export default OnboardingPage;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3rem;
  margin-top: 40rem;
`;

const BackBtn = styled.img`
  margin-left: 1rem;
  height: 15%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const NoButton = styled.div`
  margin-left: 1rem;
  height: 10%;
  aspect-ratio: 1/1;
`;

const NextBtn = styled.img`
  margin-right: 1rem;
  height: 15%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 10%;
  background-color: #3d9bf2;
  color: #ffffff;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 40px;
  border: 1px solid #513421;
  box-shadow: 1px 2px 0px 0px #7ebfff;
`;
