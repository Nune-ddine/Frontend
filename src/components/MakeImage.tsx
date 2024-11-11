// src/components/MakeImage.tsx
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const MakeImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 클릭 위치에 이미지 추가
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // container의 경계를 가져와 클릭 위치를 정확히 계산
    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    // 이미지 크기 설정
    const imgWidth = 100;
    const imgHeight = 100;

    const img = document.createElement('img');
    img.src = '/miku.png'; // 이미지 URL
    img.className = 'click-image';
    img.style.position = 'absolute';

    // 클릭한 위치를 이미지의 중앙으로 설정
    img.style.left = `${x - imgWidth / 2}px`;
    img.style.top = `${y - imgHeight / 2}px`;
    img.style.width = `${imgWidth}px`;
    img.style.height = `${imgHeight}px`;

    container.appendChild(img);
  };

  // 캡처하여 저장
  const handleSaveImage = async () => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = await html2canvas(container, { backgroundColor: null });
    const link = document.createElement('a');
    link.download = 'captured-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        style={{
          width: '800px',
          height: '600px',
          border: '1px solid black',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
      <button onClick={handleSaveImage}>Save Image</button>
    </div>
  );
};

export default MakeImage;
