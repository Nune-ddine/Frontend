// src/components/MakePNG.tsx
import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

interface MakePNGProps {
  selectedImage: string;
  selectedFeature: string;
}

export interface MakePNGHandle {
  captureImage: () => Promise<string | null>;
}

const MakePNG = forwardRef<MakePNGHandle, MakePNGProps>(({ selectedImage, selectedFeature }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedImage) return;

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    // 대분류에 따라 이미지 크기 설정
    let imgWidth: number;
    let imgHeight: number;

    switch (selectedFeature) {
      case 'shape':
        imgWidth = 300;
        imgHeight = 300;
        break;
      case 'face':
        imgWidth = 50;
        imgHeight = 50;
        break;
      case 'clothes':
        imgWidth = 100;
        imgHeight = 100;
        break;
      default:
        imgWidth = 100;
        imgHeight = 100;
    }

    const img = document.createElement('img');
    img.src = selectedImage;
    img.style.position = 'absolute';

    // 클릭 위치를 기준으로 이미지 중앙에 배치
    img.style.left = `${x - imgWidth / 2}px`;
    img.style.top = `${y - imgHeight / 2}px`;
    img.style.width = `${imgWidth}px`;
    img.style.height = 'auto'; // 비율 유지
    img.style.objectFit = 'contain';

    container.appendChild(img);
    setImages((prevImages) => [...prevImages, img]);
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
        onClick={handleContainerClick}
        style={{
          width: '100%',
          height: '500px',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
      <ButtonContainer>
        <button onClick={handleUndo} disabled={images.length === 0}>
          Undo Last
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
