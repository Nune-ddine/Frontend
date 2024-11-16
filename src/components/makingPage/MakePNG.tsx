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
        img.style.width = `${containerWidth * 0.6}px`; // 전체 크기의 60%로 줄임
        img.style.height = `${containerHeight * 0.6}px`;
        img.style.left = `${(containerWidth - containerWidth * 0.6) / 2}px`;
        img.style.top = `${(containerHeight - containerHeight * 0.6) / 2}px`;
      } else if (imgsrc.includes('eye') || imgsrc.includes('mouth')) {
        img.style.width = `${containerWidth * 0.05}px`; // 전체 크기의 5%로 줄임
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * 0.025, 0), containerWidth - containerWidth * 0.05)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * 0.025, 0), containerHeight - containerWidth * 0.05)}px`;
      } else if (imgsrc.includes('hat') || imgsrc.includes('muffler')) {
        img.style.width = `${containerWidth * 0.1}px`; // 전체 크기의 10%로 줄임
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * 0.05, 0), containerWidth - containerWidth * 0.1)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * 0.05, 0), containerHeight - containerWidth * 0.1)}px`;
      }

      img.style.objectFit = 'contain';
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

    const canvas = await html2canvas(container, {
      backgroundColor: null,
      width: container.offsetWidth,
      height: container.offsetHeight,
    });
    return canvas.toDataURL('image/png');
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
    <Wrapper>
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
  width: 200%;
  height: 200%;
  position: relative;
  overflow: hidden;
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
