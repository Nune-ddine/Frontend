import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getQuiz, postQuiz } from "../services/api/quizAPI";
import { getMember } from "../services/api/memberAPI";
import { useHeader } from "../contexts/HeaderContext";

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
  solved: boolean;
  myAnswerId: number;
  ratio1: number;
  ratio2: number;
  ratio3: number;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  snowmanId: number | null;
}

interface ResultMessageProps {
  correct: boolean;
}

const ResultMessage = styled.div<ResultMessageProps>`
  margin-top: 20px;
  font-size: 1.6rem;
  font-weight: bold;
  color: #513421;
  text-align: center;
`;

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, snowmanId }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [chance, setChance] = useState<number>(0);
  const { triggerReload, reloadHeader } = useHeader();

  useEffect(() => {
    getMember().then((res) => {
      setChance(res.chance);
    });
  }
  , [reloadHeader]);

  useEffect(() => {
    if (isOpen && snowmanId) {
      const fetchQuizData = async () => {
        try {
          const data = await getQuiz(snowmanId);
          setQuizData(data);
          setIsSolved(data.solved);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      };

      fetchQuizData();
    }
  }, [isOpen, snowmanId]);

  const handleClose = () => {
    setQuizData(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
    setIsSolved(false);
    onClose();
    triggerReload();
  };

  const handleAnswerSelection = (choiceId: number) => {
    if(chance<0){
      alert("오늘 퀴즈를 풀 기회를 모두 소진하셨어요. 내일 다시 참여해주세요 🥰");
      return;
    }

    if (snowmanId === null || snowmanId === undefined) {
      console.error("Invalid snowmanId");
      return;
    }

    setSelectedAnswer(choiceId);
    setShowResult(true);
    setIsCorrect(choiceId === quizData?.answerId);

    const solveQuiz = async (snowmanId: number, choiceId: number) => {
      try {
        await postQuiz(snowmanId, choiceId);
      } catch (error) {
        console.error("Error solving quiz:", error);
      }
    };

    solveQuiz(snowmanId, choiceId);
    // setIsSolved(true);
  };

  if (!isOpen || !quizData) {
    return null;
  }

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton
          src="images/etc/closeBtn.png"
          alt="Close"
          onClick={handleClose}
        />
        {isSolved ? (
          <>
            <HeaderText>
              {quizData.name
                ? `${quizData.username}님이 만든 ${quizData.name}`
                : "오유진님이 만든 푸앙눈구리"}
            </HeaderText>
            <QuizImage src={quizData.image} alt="Quiz" />
            <QuizContainer>
              <QuizText>{`Q. ${quizData.quiz}` || "Q. 문제를 맞춰보세요"}</QuizText>
              <ChoicesContainer>
                <ChoiceButton
                  isAnswer={quizData.answerId === 1}
                  isSelected={quizData.myAnswerId === 1}
                  showResult={true}
                  disabled={true}
                >
                  <img
                    src="images/quizs/numberBtn1.png"
                    style={{ height: "30px" }}
                  />
                  {quizData.choice1 || "Option 1"}
                  <div>{(quizData.ratio1 * 100).toFixed(0)} %</div>
                </ChoiceButton>
                <ChoiceButton
                  isAnswer={quizData.answerId === 2}
                  isSelected={quizData.myAnswerId === 2}
                  showResult={true}
                  disabled={true}
                >
                  <img
                    src="images/quizs/numberBtn2.png"
                    style={{ height: "30px" }}
                  />
                  {quizData.choice2 || "Option 2"}
                  <div>{(quizData.ratio2 * 100).toFixed(0)} %</div>
                </ChoiceButton>
                <ChoiceButton
                  isAnswer={quizData.answerId === 3}
                  isSelected={quizData.myAnswerId === 3}
                  showResult={true}
                  disabled={true}
                >
                  <img
                    src="images/quizs/numberBtn3.png"
                    style={{ height: "30px" }}
                  />
                  {quizData.choice3 || "Option 3"}
                  <div>{(quizData.ratio3 * 100).toFixed(0)} %</div>
                </ChoiceButton>
              </ChoicesContainer>
            </QuizContainer>
          </>
        ) : (
          <>
            <HeaderText>
              {quizData.name
                ? `${quizData.username}님이 만든 ${quizData.name}`
                : "오유진님이 만든 푸앙눈구리"}
            </HeaderText>
            <QuizImage src={quizData.image} alt="Quiz" />
            <QuizContainer>
              <QuizText>{`Q. ${quizData.quiz}` || "Q. 문제를 맞춰보세요"}</QuizText>
              <ChoicesContainer>
                <ChoiceButton
                  isAnswer={quizData.answerId === 1}
                  isSelected={selectedAnswer === 1}
                  showResult={showResult}
                  onClick={() => handleAnswerSelection(1)}
                >
                  <img
                    src="images/quizs/numberBtn1.png"
                    style={{ height: "30px" }}
                  />
                  {quizData.choice1 || "Option 1"}
                  <div></div>
                </ChoiceButton>
                <ChoiceButton
                  isAnswer={quizData.answerId === 2}
                  isSelected={selectedAnswer === 2}
                  showResult={showResult}
                  onClick={() => handleAnswerSelection(2)}
                >
                  <img
                    src="images/quizs/numberBtn2.png"
                    style={{ height: "30px" }}
                  />
                  {quizData.choice2 || "Option 2"}
                  <div></div>
                </ChoiceButton>
                <ChoiceButton
                  isAnswer={quizData.answerId === 3}
                  isSelected={selectedAnswer === 3}
                  showResult={showResult}
                  onClick={() => handleAnswerSelection(3)}
                >
                  <img
                    src="images/quizs/numberBtn3.png"
                    style={{ height: "30px" }}
                  />
                  {quizData.choice3 || "Option 3"}
                  <div></div>
                </ChoiceButton>
              </ChoicesContainer>
            </QuizContainer>
          </>
        )}
        {showResult && !isSolved && (
          <ResultMessage correct={isCorrect ?? false}>
            {isCorrect ? (
              <div>
                <p>정답입니다!</p>
                <HeaderText
                  style={{
                    fontSize: "1.6rem",
                    background: "#3D9BF2",
                    width: "90%",
                    color: "white",
                  }}
                >
                  + 100 Point
                </HeaderText>
              </div>
            ) : (
              <>
                <p>오답입니다.</p>
                <p>다른 퀴즈를 맞춰보세요!</p>
              </>
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
  font-family: 'MaplestoryOTFBold';
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

export const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const HeaderText = styled.div`
  background-color: #e4f1ff;
  color: #513421;
  padding: 8px 5%;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 10px auto;
  text-align: center;
`;

const QuizImage = styled.img`
  width: 80%;
  height: auto;
  display: block;
`;

const QuizContainer = styled.div`
  width: 100%;
  background-color: #e4f1ff;
  border: 1px solid #513421;
  border-radius: 12px;
`;

const QuizText = styled.div`
  background-color: #3d9bf2;
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
  font-family: 'MaplestoryOTFLight';
  font-weight: light;
`;

const ChoiceButton = styled.button<{ isSelected: boolean; isAnswer: boolean; showResult: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #513421;
  background: ${props =>
    props.showResult
      ? props.isAnswer
        ? '#E3FFE3'
        : props.isSelected
        ? '#FFD8D8'
        : '#fff'
      : '#fff'}; // Default background color before selection
  color: ${props =>
    props.showResult
      ? props.isAnswer
        ? '#388E3C'
        : props.isSelected
        ? '#D32F2F'
        : '#000'
      : '#000'}; // Default text color before selection
  box-shadow: 1px 2px 0px -1px rgba(61, 155, 242, 0.48);
  padding: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #e0e0e0;
  }
`;
