import React, { useState } from 'react'
import Quiz from '../components/HomePage/Quiz';
import QuizModal from '../components/Quiz';

const QuizTestPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div>
        <button onClick={openModal}>퀴즈 시작하기</button>
        <QuizModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
}

export default QuizTestPage;
