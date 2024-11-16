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

      const shapeOffset = 0.8;
      const faceOffset = 0.08;
      const clothesOffset = 0.2;

      if (imgsrc.includes('shape')) {
        img.style.width = `${containerWidth * shapeOffset}px`;
        img.style.height = `${containerHeight * shapeOffset}px`;
        img.style.left = `${(containerWidth - containerWidth * shapeOffset) / 2}px`;
        img.style.top = `${(containerHeight - containerHeight * shapeOffset) / 2}px`;
      } else if (imgsrc.includes('eye') || imgsrc.includes('mouth') || imgsrc.includes('nose')) {
        img.style.width = `${containerWidth * faceOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * faceOffset / 2, 0), containerWidth - containerWidth * faceOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * faceOffset / 2, 0), containerHeight - containerWidth * faceOffset)}px`;
      } else if (imgsrc.includes('hat') || imgsrc.includes('muffler')) {
        img.style.width = `${containerWidth * clothesOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * clothesOffset / 2, 0), containerWidth - containerWidth * clothesOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * clothesOffset / 2, 0), containerHeight - containerWidth * clothesOffset)}px`;
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
          <ImgButton
            src="/images/etc/undoBtn.png"
            onClick={handleUndo}
            disabled={images.length === 0}
            visible={images.length > 0}
          />
          <ImgButton
            src="/images/etc/clearAllBtn.png"
            onClick={handleClearAll}
            disabled={images.length === 0}
            visible={images.length > 0}
          />
          <ImgButton
            src="/images/etc/redoBtn.png"
            onClick={handleRedo}
            disabled={redoImages.length === 0}
            visible={redoImages.length > 0}
          />
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
  height: 120%;
  position: relative;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1%;
  height: 10%;
`;

const ImgButton = styled.img<{ disabled?: boolean; visible?: boolean }>`
  height: 70%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
`;

const NameInput = styled.input`
  width: 90%;
  height: 8%;
  border: none;
  border-radius: 40px;
  margin-bottom: 16px;
  background-color: #d4eaff;
  font-family: sans-serif;
  padding-left: 10px;
  margin-top: 10px;
  font-size: 0.8rem;
  text-align: center;
  color: #513421;
`;