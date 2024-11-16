import React, { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import html2canvas from 'html2canvas';
import { selectedItemState, snowmanState } from '../../contexts/snowmanState';
import styled from 'styled-components';

const MakePNG = () => {
  const selectedItem = useRecoilValue(selectedItemState); // 클릭된 아이템 정보 가져오기
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowman, setSnowman] = useRecoilState(snowmanState); // snowman 상태

  const handlePositionClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container || !selectedItem.imgSrc) return;

    const img = document.createElement('img');
    img.src = selectedItem.imgSrc;
    img.alt = selectedItem.name;
    img.style.position = 'absolute';

    // 클릭한 위치에 배치
    const rect = container.getBoundingClientRect();
    img.style.left = `${e.clientX - rect.left}px`;
    img.style.top = `${e.clientY - rect.top}px`;

    img.style.width = '50px'; // 크기 조정
    img.style.height = '50px';
    img.style.objectFit = 'contain';

    container.appendChild(img);
  };

  const saveSnowmanAsBase64 = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = await html2canvas(container, { backgroundColor: null });
      const base64Image = canvas.toDataURL('image/png'); // Base64로 변환
      setSnowman((prevSnowman) => ({
        ...prevSnowman,
        image: base64Image, // Base64 이미지 저장
      }));
    } catch (error) {
      console.error('Failed to capture the snowman as Base64:', error);
    }
  };

  return (
    <Wrapper>
      <Container
        ref={containerRef}
        onClick={handlePositionClick}
        style={{ position: 'relative', width: '100%', height: '100%', border: '1px solid black' }}
      >
        {/* 아이템 배치 영역 */}
      </Container>
      <ButtonContainer>
        <Button onClick={saveSnowmanAsBase64}>Save Snowman</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default MakePNG;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
