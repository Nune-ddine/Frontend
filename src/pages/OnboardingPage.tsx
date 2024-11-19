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
    if (numericId < 5) {
      navigate(`/onboarding/${numericId + 1}`);
    }
  };

  return (
    <OnboardingWrapper>
      <ButtonContainer>
        {(id === "1") && (
          <NoButton />
        )}
        {(id === "2" || id === "3" || id === "4") && (
          <BackBtn src="/images/etc/leftBtn.png" onClick={handleBackClick}/>
        )}
        {(id === "1" || id === "2" || id === "3" || id === "4") && (
          <NextBtn src="/images/etc/rightBtn.png" onClick={handleNextClick} />
        )}
        {(id === "5") && (
            <Button onClick={() => (navigate("/1"))}>눈사람 굴리러 가기</Button>

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
  padding : 0 3rem;
  margin-top : 50rem;
`;

const BackBtn = styled.img`
  margin-left: 1rem;
  height: 23%;
  width: 9%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const NoButton = styled.div`
  margin-left: 1rem;
  height: 23%;
  width: 9%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const NextBtn = styled.img`
  margin-left: 1rem;
  height: 23%;
  width: 9%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 10%;
  background-color: #3d9bf2;
  color: #ffffff;
  padding: 2.0rem;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 100px;
  border-radius: 40px;
  border: 1px solid #513421;
  background: #3D9BF2;
  box-shadow: 1px 2px 0px 0px #7EBFFF;
`;