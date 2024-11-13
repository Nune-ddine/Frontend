// src/components/MakePNG.tsx
import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

interface MakePNGProps {
  selectedFeature: string;
  selectedImage: string;
}

export interface MakePNGHandle {
  captureImage: () => Promise<string | null>;
}

const MakePNG = forwardRef<MakePNGHandle, MakePNGProps>(({ selectedFeature}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFeature, setCurrentFeature] = useState(selectedFeature);

  useEffect(() => {
    setCurrentFeature(selectedFeature);
  }, [selectedFeature]);

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

      // currentFeature에 따라 이미지 크기 조정
      let imgWidth: number;
      let imgHeight: number;

      switch (currentFeature) {
        case 'shape':
          imgWidth = 400;
          imgHeight = 400;
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
      img.src = imgSrc;
      img.alt = name;
      img.style.position = 'absolute';
      img.style.left = `${x - imgWidth / 2}px`;
      img.style.top = `${y - imgHeight / 2}px`;
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
