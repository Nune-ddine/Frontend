import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface QuizData {
  id: number;
  name: string | null;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 90%;
  width: 400px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const QuizImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const QuizText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
`;

const ChoiceButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #e0e0e0;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const ResultMessage = styled.div`
  margin-top: 20px;
  font-size: 1rem;
  color: ${props => (props.correct ? 'green' : 'red')};
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
        <CloseButton onClick={onClose}>✕</CloseButton>
        <QuizImage src={quizData.image} alt="Quiz" />
        <QuizText>{quizData.quiz}</QuizText>
        <ChoicesContainer>
          <ChoiceButton onClick={() => handleAnswerSelection(1)}>{quizData.choice1 || "Option 1"}</ChoiceButton>
          <ChoiceButton onClick={() => handleAnswerSelection(2)}>{quizData.choice2 || "Option 2"}</ChoiceButton>
          <ChoiceButton onClick={() => handleAnswerSelection(3)}>{quizData.choice3 || "Option 3"}</ChoiceButton>
        </ChoicesContainer>
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
}

export default QuizModal;
