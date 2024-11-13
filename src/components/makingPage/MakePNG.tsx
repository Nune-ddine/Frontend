// src/components/MakePNG.tsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

interface MakePNGProps {
  selectedImage: string;
  selectedFeature: string; // 소분류 키 추가
}

const MakePNG: React.FC<MakePNGProps> = ({ selectedImage, selectedFeature }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedImage) return;

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    // 소분류에 따라 이미지 크기를 설정
    let imgWidth = 200;
    let imgHeight = 200;

    if (selectedFeature === 'shape') {
      imgWidth = 400;
      imgHeight = 400;
    } else if (selectedFeature === 'face') {
      imgWidth = 50;
      imgHeight = 50;
    } else if (selectedFeature === 'clothes') {
      imgWidth = 100;
      imgHeight = 100;
    }

    const img = document.createElement('img');
    img.src = selectedImage;
    img.className = 'click-image';
    img.style.position = 'absolute';

    img.style.left = `${x - imgWidth / 2}px`;
    img.style.top = `${y - imgHeight / 2}px`;
    img.style.width = `${imgWidth}px`;
    img.style.height = 'auto';
    img.style.objectFit = 'contain';

    container.appendChild(img);
    setImages((prevImages) => [...prevImages, img]);
  };

  const handleSaveImage = async () => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = await html2canvas(container, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement('a');
    link.download = 'snowman-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

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
        <button onClick={handleSaveImage}>Save Image</button>
        <button onClick={handleUndo} disabled={images.length === 0}>
          Undo Last
        </button>
        <button onClick={handleClearAll} disabled={images.length === 0}>
          Clear All
        </button>
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
