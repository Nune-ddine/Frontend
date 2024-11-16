import React, { useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../Quiz";
import { getGotcha, GotchaItem } from "../../services/api/gotchaAPI";

const Gotcha: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemData, setItemData] = useState<GotchaItem | null>(null);

  const handleClick = async () => {
    setIsPlaying(true);
    try {
      const gotchaData = await getGotcha(); // Fetch API result
      setTimeout(() => {
        setIsPlaying(false);
        if (gotchaData) {
          setItemData(gotchaData); // Update state with fetched data
          setShowModal(true);
        }
      }, 7500);
    } catch (error) {
      console.error("Error fetching gotcha data:", error);
      setIsPlaying(false);
    }
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
      {showModal && itemData && (
        <Modal>
          <ModalContent>
            <CloseButton src="/images/etc/closeBtn.png" onClick={closeModal} />
            <h2>{itemData.itemName} 획득!</h2>
            <img
              src="/images/etc/puangman.png"
              style={{
                width: "100%",
              }}
              alt="Gotcha Result"
            />
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Gotcha;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "MaplestoryOTFBold";
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
  background-color: #3d9bf2;
  color: #ffffff;
  padding: 1%;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 100px;
  border: 3px solid #0084ff;
  margin-top: 1rem;
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
  color: #513421;
  background-color: white;
  padding: 0 0 2rem 0;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 360px;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;