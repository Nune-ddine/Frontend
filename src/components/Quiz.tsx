import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface QuizData {
  id: number;
  name: string | null;
  username: string | null;
  image: string;
  quiz: string;
  answerId: number;
  choice1: string | null;
  choice2: string | null;
  choice3: string | null;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResultMessageProps {
  correct: boolean;
}

const ResultMessage = styled.div<ResultMessageProps>`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  color: ${props => (props.correct ? '#007bff' : 'red')};
  text-align: center;
`;

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Fetch quiz data from the API
      axios.get<QuizData>('YOUR_API_ENDPOINT_HERE')
        .then(response => setQuizData(response.data))
        .catch(error => console.error('Error fetching quiz data:', error));
    }
  }, [isOpen]);

  const handleAnswerSelection = (choiceId: number) => {
    setSelectedAnswer(choiceId);
    setShowResult(true);
    // Check if selected answer is correct
    if (quizData && choiceId === quizData.answerId) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  if (!isOpen || !quizData) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton src='images/etc/closeBtn.png' alt="Close" onClick={onClose} />
        <HeaderText>{quizData.name ? `${quizData.username}님이 만든 ${quizData.name}` : "오유진님이 만든 푸앙눈구리"}</HeaderText>
        <QuizImage src={quizData.image} alt="Quiz" />
        <QuizContainer>
          <QuizText>{quizData.quiz || "Q. 문제를 맞춰보세요"}</QuizText>
          <ChoicesContainer>
            <ChoiceButton onClick={() => handleAnswerSelection(1)}><img src='images/quizs/numberBtn1.png' style={{height:"30px"}}/>{quizData.choice1 || "Option 1"}</ChoiceButton>
            <ChoiceButton onClick={() => handleAnswerSelection(2)}><img src='images/quizs/numberBtn2.png' style={{height:"30px"}}/>{quizData.choice2 || "Option 2"}</ChoiceButton>
            <ChoiceButton onClick={() => handleAnswerSelection(3)}><img src='images/quizs/numberBtn3.png' style={{height:"30px"}}/>{quizData.choice3 || "Option 3"}</ChoiceButton>
          </ChoicesContainer>
        </QuizContainer>
        {showResult && (
          <ResultMessage correct={isCorrect}>
            {isCorrect ? (
              <div>
                <p>정답을 맞췄어요!</p>
                <p>+ 50 Point</p>
              </div>
            ) : (
              <p>틀렸어요! 다시 시도해보세요.</p>
            )}
          </ResultMessage>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default QuizModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  position: relative;
  max-width: 90%;
  width: 360px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const HeaderText = styled.div`
  background-color: #E4F1FF;
  color: #513421;
  padding: 8px 5%;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 10px auto;
  text-align: center;
`;

const QuizImage = styled.img`
  width: 150px;
  height: 150px;
  margin: 15px auto;
  display: block;
`;

const QuizContainer = styled.div`
  width: 100%;
  background-color : #E4F1FF;
  border: 1px solid #513421;   
  border-radius: 12px;
  font-family: 'MaplestoryOTFBold';
`;

const QuizText = styled.div`
  background-color: #3D9BF2;
  color: white;
  padding: 12px;
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid #513421;   
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5%;
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 auto 10px;
  width: 90%;
`;

const ChoiceButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #513421;   
  background: #FFF;
  box-shadow: 1px 2px 0px -1px rgba(61, 155, 242, 0.48);
  padding: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #e0e0e0;
  }
`;