import React, { useState } from 'react'
import QuizModal from '../components/Quiz';
import { createSnowman } from '../services/api/sunbeenTESTAPI';


const QuizTestPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const createNun = async() => {
      const response = await createSnowman();
      // console.log(response);
    }
  
    return (
      <div>
        <button onClick={createNun}>눈사람 만들기</button>
        {/* <button onClick={openModal}>퀴즈 시작하기</button> */}
        {/* <QuizModal isOpen={isModalOpen} onClose={closeModal} /> */}
      </div>
    );
}

export default QuizTestPage;
