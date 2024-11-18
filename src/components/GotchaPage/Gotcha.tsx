import React, { useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../Quiz";
import { getGotcha } from "../../services/api/gotchaAPI";

export interface GotchaItem {
  id: number;
  itemName: string;
  itemCategory: string;
}

export interface GotchaResponse {
  item: GotchaItem;
  gachable: boolean;
}

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
          setItemData(gotchaData?.item || null); // Update here to match the response interface
          setShowModal(true);
        }
      }, 7500);
    } catch (error: any) {
      console.error("Error:", error);
      setIsPlaying(false);
    
      if (error?.response) {
        const statusCode = error.response.status;
    
        switch (statusCode) {
          case 204:
            setModalMessage("더 이상 뽑을 아이템이 없습니다");
            break;
          case 412:
            setModalMessage("가챠 포인트가 부족합니다");
            break;
          case 423:
            setModalMessage("꽝입니다.");
            break;
          default:
            console.error("Unknown server error:", error.response);
            alert("가챠 데이터를 가져오는 중 문제가 발생했습니다.");
            return;
        }
    
        setTimeout(() => {
          setShowModal(true);
        }, 7500);
      } else {
        // response가 없을 경우 네트워크 오류 등으로 간주
        console.error("Network or unknown error:", error);
        alert("네트워크 문제로 가챠 데이터를 가져오는 중 문제가 발생했습니다.");
      }
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