// src/components/MakePNG.tsx
import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

interface MakePNGProps {
  selectedImage: string;
}

export interface MakePNGHandle {
  captureImage: () => Promise<string | null>;
}

const MakePNG = forwardRef<MakePNGHandle, MakePNGProps>(({ selectedImage }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const imgSrc = event.dataTransfer.getData('imgSrc');
    const name = event.dataTransfer.getData('name');

    if (imgSrc) {
      console.log('Dropped Item Name:', name); // 드롭된 아이템 이름 출력

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
        // 'shape'일 경우 이미지가 중앙에서 약간 아래로 배치되도록 설정
        const offsetY = 60; // 중앙에서 아래로 내릴 정도를 조정
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
    event.preventDefault(); // 드롭 허용을 위해 기본 동작을 막음
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
      <ButtonContainer>
        <button onClick={handleUndo} disabled={images.length === 0}>
          Undo
        </button>
        <button onClick={handleClearAll} disabled={images.length === 0}>
          Clear All
        </button>
      </ButtonContainer>
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
