import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import { snowmanState } from '../../contexts/snowmanState';
import { useRecoilState } from 'recoil';

interface MakePNGProps {
  selectedFeature: string;
  isQuizMode: boolean;
}

export interface MakePNGHandle {
  captureImage: () => Promise<string | null>;
}

const MakePNG = forwardRef<MakePNGHandle, MakePNGProps>(({ selectedFeature, isQuizMode }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [redoImages, setRedoImages] = useState<HTMLImageElement[]>([]);
  const [snowman, setSnowman] = useRecoilState(snowmanState);

  // 화면 스크롤 방지
  const preventScroll = (e: Event) => {
    e.preventDefault();
  };

  const enablePreventScroll = () => {
    document.body.addEventListener('touchmove', preventScroll, { passive: false });
  };

  const disablePreventScroll = () => {
    document.body.removeEventListener('touchmove', preventScroll);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const imgsrc = event.dataTransfer.getData('imgsrc');
    const name = event.dataTransfer.getData('name');

    if (imgsrc) {
      const containerRect = container.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;

      const img = document.createElement('img');
      img.src = imgsrc;
      img.alt = name;
      img.style.position = 'absolute';

      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      if (imgsrc.includes('shape')) {
        img.style.width = `${containerWidth}px`;
        img.style.height = `${containerHeight}px`;
        img.style.left = '0px';
        img.style.top = '0px';
      } else if (imgsrc.includes('eye') || imgsrc.includes('mouth')) {
        img.style.width = `${containerWidth * 0.1}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * 0.05, 0), containerWidth - containerWidth * 0.1)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * 0.05, 0), containerHeight - containerWidth * 0.1)}px`;
      } else if (imgsrc.includes('hat') || imgsrc.includes('muffler')) {
        img.style.width = `${containerWidth * 0.2}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * 0.1, 0), containerWidth - containerWidth * 0.2)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * 0.1, 0), containerHeight - containerWidth * 0.2)}px`;
      }

      img.style.objectFit = 'contain';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      container.appendChild(img);

      setImages((prevImages) => [...prevImages, img]);
      setRedoImages([]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const captureImage = async (): Promise<string | null> => {
    const container = containerRef.current;
    if (!container) return null;
  
    // 컨테이너의 실제 크기를 가져오기
    const { width, height } = container.getBoundingClientRect();
  
    // 캔버스 옵션 설정
    const canvas = await html2canvas(container, {
      backgroundColor: null, // 투명 배경 유지
      scale: window.devicePixelRatio, // 디바이스 픽셀 비율 적용
      width, // 실제 너비
      height, // 실제 높이
    });
  
    // 캔버스를 PNG 데이터 URL로 변환
    return canvas.toDataURL('snowmanImg/png');
  };
  

  useImperativeHandle(ref, () => ({
    captureImage,
  }));

  const handleUndo = () => {
    const lastImage = images.pop();
    if (lastImage && containerRef.current) {
      containerRef.current.removeChild(lastImage);
      setImages([...images]);
      setRedoImages((prevRedoImages) => [lastImage, ...prevRedoImages]);
    }
  };

  const handleRedo = () => {
    const lastRedoImage = redoImages.shift();
    if (lastRedoImage && containerRef.current) {
      containerRef.current.appendChild(lastRedoImage);
      setImages((prevImages) => [...prevImages, lastRedoImage]);
      setRedoImages([...redoImages]);
    }
  };

  const handleClearAll = () => {
    if (containerRef.current) {
      images.forEach((img) => containerRef.current?.removeChild(img));
      setImages([]);
      setRedoImages([]);
    }
  };

  return (
    <Wrapper
      onTouchStart={enablePreventScroll}
      onTouchEnd={disablePreventScroll}
    >
      <Container
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      {!isQuizMode ? (
        <ButtonContainer>
          {images.length > 0 && (
            <>
              <Button onClick={handleUndo}>Undo</Button>
              <Button onClick={handleClearAll}>Clear All</Button>
            </>
          )}
          {redoImages.length > 0 && <Button onClick={handleRedo}>Redo</Button>}
        </ButtonContainer>
      ) : (
        <NameInput
          placeholder="눈사람에게 이름을 지어주세요"
          value={snowman.name}
          onChange={(e) => setSnowman({ ...snowman, name: e.target.value })}
        />
      )}
    </Wrapper>
  );
});

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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #ffe2a4;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid #513421;
  font-size: 14px;
  color: #513421;
  cursor: pointer;
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const NameInput = styled.input`
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 40px;
  margin-bottom: 16px;
  background-color: #d4eaff;
  font-family: sans-serif;
  padding-left: 10px;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  color: #513421;
`;
