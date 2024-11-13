import { useState } from 'react';
import styled from 'styled-components';

const Quiz = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal}>가챠</button>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal}>x</button>
            <image>눈사람 이미지</image>
            <div>문제</div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Quiz;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction : column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
`;
