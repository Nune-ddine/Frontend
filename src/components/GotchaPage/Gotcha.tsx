import React, { useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../Quiz";

const Gotcha = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
      setShowModal(true);
    }, 7500);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Wrapper>
      <GotchaImg
        src={isPlaying ? "/images/gotchas/gotcha.gif" : "/images/gotchas/gotcha.png"}
        alt="Gotcha"
      />
      <Button onClick={handleClick}>과잠 가챠 돌리기 300p</Button>
      {showModal && (
        <Modal>
          <ModalContent>
          <CloseButton src='/images/etc/closeBtn.png' onClick={closeModal}/>
            <h2>시각 디자인학과 과잠 획득!</h2>
            <div style={{backgroundColor:"brown", width:"200px;",height:"300px"}}>네모</div>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Gotcha;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'MaplestoryOTFBold';
  margin-bottom: 5rem;
`;

const GotchaImg = styled.img`
  width: 100%;
  height: 500px;
`;

const Button = styled.button`
  display: flex;
  width: 75%;
  height: 10%;
  background-color: #3D9BF2;
  color: #ffffff;
  padding: 1%;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 100px;
  border: 3px solid #0084FF;
  margin-top: 3rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  color :  #513421;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  font-size : 1.4rem;
`;
