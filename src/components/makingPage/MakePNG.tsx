// src/components/MakePNG.tsx
import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

interface MakePNGProps {
  selectedFeature: string;
  isQuizMode: boolean; // 퀴즈 모드 여부 추가
}

export interface MakePNGHandle {
  captureImage: () => Promise<string | null>;
}

const MakePNG = forwardRef<MakePNGHandle, MakePNGProps>(({ selectedFeature, isQuizMode }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const imgSrc = event.dataTransfer.getData('imgSrc');
    const name = event.dataTransfer.getData('name');

    if (imgSrc) {
      const containerRect = container.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;

      let imgWidth: number;
      let imgHeight: number;

      if (imgSrc.includes('shape')) {
        imgWidth = 400;
        imgHeight = 400;
      } else if (imgSrc.includes('eye') || imgSrc.includes('mouth')) {
        imgWidth = 50;
        imgHeight = 50;
      } else if (imgSrc.includes('clothes')) {
        imgWidth = 100;
        imgHeight = 100;
      } else {
        imgWidth = 100;
        imgHeight = 100;
      }

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = name;
      img.style.position = 'absolute';

      if (imgSrc.includes('shape')) {
        const offsetY = 70;
        img.style.left = `${containerRect.width / 2 - imgWidth / 2}px`;
        img.style.top = `${containerRect.height / 2 - imgHeight / 2 + offsetY}px`;
      } else {
        img.style.left = `${x - imgWidth / 2}px`;
        img.style.top = `${y - imgHeight / 2}px`;
      }

      img.style.width = `${imgWidth}px`;
      img.style.height = 'auto';
      img.style.objectFit = 'contain';

      container.appendChild(img);
      setImages((prevImages) => [...prevImages, img]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const captureImage = async (): Promise<string | null> => {
    const container = containerRef.current;
    if (!container) return null;

    const canvas = await html2canvas(container, { backgroundColor: null });
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
    }
  };

  const handleClearAll = () => {
    if (containerRef.current) {
      images.forEach((img) => containerRef.current?.removeChild(img));
      setImages([]);
    }
  };

  return (
    <Wrapper>
      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '100%',
          height: '500px',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
      {!isQuizMode && ( // 퀴즈 모드가 아닐 때만 버튼 표시
        <ButtonContainer>
          <button onClick={handleUndo} disabled={images.length === 0}>
            Undo
          </button>
          <button onClick={handleClearAll} disabled={images.length === 0}>
            Clear All
          </button>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
