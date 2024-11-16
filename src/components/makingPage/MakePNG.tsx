import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import html2canvas from 'html2canvas';
import { selectedItemState, snowmanState } from '../../contexts/snowmanState';
import styled from 'styled-components';

const MakePNG = () => {
  const selectedItem = useRecoilValue(selectedItemState);
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowman, setSnowman] = useRecoilState(snowmanState);

  useEffect(() => {
    console.log('Snowman state updated:', snowman);
  }, [snowman]);

  const handlePositionClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container || !selectedItem.imgSrc) return;
  
    const img = document.createElement('img');
    img.src = selectedItem.imgSrc;
    img.alt = selectedItem.name;
    img.style.position = 'absolute';
    img.style.objectFit = 'contain';
  
    const rect = container.getBoundingClientRect();
  
    let imgWidth = 50;
    let imgHeight = 50;
  
    if (selectedItem.imgSrc.includes('shape')) {
      // 이미지 크기를 container의 폭 기준으로 비율 계산
      imgWidth = rect.width * 0.8; // 80% 크기
      imgHeight = imgWidth; // 정사각형 유지
      img.style.left = `${(rect.width - imgWidth) / 2}px`;
      img.style.top = `${(rect.height - imgHeight) / 2}px`;
    } else {
      if (selectedItem.imgSrc.includes('face')) {
        imgWidth = rect.width * 0.2; // 20% 크기
        imgHeight = imgWidth; // 정사각형 유지
      } else if (selectedItem.imgSrc.includes('clothes')) {
        imgWidth = rect.width * 0.3; // 30% 크기
        imgHeight = imgWidth; // 정사각형 유지
      }
      img.style.left = `${e.clientX - rect.left - imgWidth / 2}px`;
      img.style.top = `${e.clientY - rect.top - imgHeight / 2}px`;
    }
  
    img.style.width = `${imgWidth}px`;
    img.style.height = `${imgHeight}px`;
    img.style.objectFit = 'contain';
  
    container.appendChild(img);
  
    saveSnowmanAsBase64();
  };
  

  const saveSnowmanAsBase64 = async () => {
    const container = containerRef.current;
    if (!container) return;
  
    const rect = container.getBoundingClientRect();
    try {
      const canvas = await html2canvas(container, {
        backgroundColor: null,
        width: rect.width,
        height: rect.height,
      });
      const base64Image = canvas.toDataURL('image/png');
      setSnowman((prevSnowman) => ({
        ...prevSnowman,
        image: base64Image,
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
  height: 0;
  padding-bottom: 100%; /* 정사각형 비율 유지 */
  position: relative;
  overflow: hidden;
`;

