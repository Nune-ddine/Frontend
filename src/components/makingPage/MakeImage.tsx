import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

const MakeImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // 클릭 위치에 이미지 추가
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    const imgWidth = 300;
    const imgHeight = 300;

    const img = document.createElement('img');
    img.src = '/public/images/items/shape/shape_puang.png';
    img.className = 'click-image';
    img.style.position = 'absolute';

    // 클릭한 위치가 이미지의 중앙이 되도록 좌표 조정
    img.style.left = `${x - imgWidth / 2}px`;
    img.style.top = `${y - imgHeight / 2}px`;
    img.style.width = `${imgWidth}px`;
    img.style.height = 'auto'; // 비율 유지
    img.style.objectFit = 'contain';

    // 컨테이너에 이미지 추가 및 상태 업데이트
    container.appendChild(img);
    setImages((prevImages) => [...prevImages, img]);
  };

  // 캡처하여 저장
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

  // 마지막 이미지 되돌리기
  const handleUndo = () => {
    const lastImage = images.pop();
    if (lastImage && containerRef.current) {
      containerRef.current.removeChild(lastImage);
      setImages([...images]); // 상태 업데이트
    }
  };

  // 모든 이미지 삭제
  const handleClearAll = () => {
    if (containerRef.current) {
      images.forEach((img) => containerRef.current?.removeChild(img));
      setImages([]); // 상태 초기화
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

export default MakeImage;

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
