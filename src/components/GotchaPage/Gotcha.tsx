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

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request is successful, just return the response
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 204:
          return Promise.reject("더 이상 뽑을 아이템이 없습니다");
        case 412:
          return Promise.reject("가챠 포인트가 부족합니다");
        case 423:
          return Promise.reject("꽝입니다.");
        default:
          console.error("Unknown server error:", error.response);
          return Promise.reject("가챠 데이터를 가져오는 중 문제가 발생했습니다.");
      }
    } else {
      // Handle network or other errors
      console.error("Network or unknown error:", error);
      return Promise.reject("네트워크 문제로 가챠 데이터를 가져오는 중 문제가 발생했습니다.");
    }
  }
);

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
          setItemData(gotchaData?.item || null);
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
              <h2>{itemData?.itemName} 획득!</h2>
            ) : (
              <h2>{modalMessage}</h2>
            )}
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

const CloseButton = styled.img`
  margin-top: 1rem;
  width : 10%;
  margin-left:82%;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
`;
