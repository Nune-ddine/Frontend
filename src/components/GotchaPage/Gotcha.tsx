import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

export interface GotchaItem {
  id: number;
  itemName: string;
  itemCategory: string;
}

export interface GotchaResponse {
  item: GotchaItem;
  gachable: boolean;
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "https://nuneddine.p-e.kr/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getGotcha = async (): Promise<GotchaResponse | null> => {
  try {
    const response = await axiosInstance.get<GotchaResponse>("/item/gotcha");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to get gotcha data:", error);
    alert(error);
    return null;
  }
};

const Gotcha: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemData, setItemData] = useState<GotchaItem | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setIsPlaying(true);
    try {
      const gotchaData = await getGotcha();
      setTimeout(() => {
        setIsPlaying(false);
        if (gotchaData) {
          if (gotchaData.item.id === 1) {
            setModalMessage("꽝이에요!");
          } else {
            setItemData(gotchaData?.item || null);
          }
          setShowModal(true);
        } else {
          setModalMessage("모든 아이템을 다 뽑으셨어요!");
          setShowModal(true);
        }
      }, 7500);
    } catch (error: any) {
      console.error("Error:", error);
      setIsPlaying(false);
      setModalMessage(error);
      setTimeout(() => {
        setShowModal(true);
      }, 7500);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage(null);
    setItemData(null);
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
            <CloseButton src="/images/etc/closeBtn.png" onClick={closeModal} />
            {itemData ? (
              <>
              <h2>{itemData?.itemName} 획득!</h2>
              <img
              src="/images/etc/puangman.png"
              style={{
                width: "100%",
              }}
              alt="Gotcha Result"
              />
            </>
            ) : (
              <>
              <h2>{modalMessage}</h2>
              <img
              src="/images/gotchas/sadSnowman.png"
              style={{
                width: "100%",
              }}
              alt="Gotcha Result"
              />
              </>
            )}
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
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: flex;
  width: 75%;
  height: 10%;
  background-color: #3d9bf2;
  color: #ffffff;
  padding: 2.0rem;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 100px;
  border: 3px solid #0084ff;
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
  padding: 0 0 4rem 0;
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

const CloseButton = styled.img`
  margin-top: 1rem;
  width: 10%;
  margin-left: 82%;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
`;
