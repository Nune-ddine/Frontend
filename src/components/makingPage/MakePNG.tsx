import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import { shapeExistState, snowmanExsitState, snowmanState } from '../../contexts/snowmanState';
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
  const [isSnowmanExist, setIsSnowmanExist] = useRecoilState(snowmanExsitState);
  const [isShapeExist, setIsShapeExist] = useRecoilState(shapeExistState);

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

      //각 중분류 별 이미지 크기 조정
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      const shapeOffset = 0.8;
      const eyeOffset = 0.1;
      const mouthOffset = 0.06;
      const noseOffset = 0.03;
      const hatOffset = 0.15;
      const mufflerOffset = 0.2;
      const outerOffset = 0.35;
      
      if (imgsrc.includes('shape')) {
        img.style.width = `${containerWidth * shapeOffset}px`;
        img.style.height = `${containerHeight * shapeOffset}px`;
        img.style.left = `${(containerWidth - containerWidth * shapeOffset) / 2}px`;
        img.style.top = `${(containerHeight - containerHeight * shapeOffset) / 2}px`;
        // shape 아이템 추가 시 Recoil 상태 true로 설정
        setIsShapeExist(true);
      } else if (imgsrc.includes('eye')) {
        img.style.width = `${containerWidth * eyeOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * eyeOffset / 2, 0), containerWidth - containerWidth * eyeOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * eyeOffset / 2, 0), containerHeight - containerWidth * eyeOffset)}px`;
      } else if (imgsrc.includes('mouth')) {
        img.style.width = `${containerWidth * mouthOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * mouthOffset / 2, 0), containerWidth - containerWidth * mouthOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * mouthOffset / 2, 0), containerHeight - containerWidth * mouthOffset)}px`;
      } else if (imgsrc.includes('nose')) {
        img.style.width = `${containerWidth * noseOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * noseOffset / 2, 0), containerWidth - containerWidth * noseOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * noseOffset / 2, 0), containerHeight - containerWidth * noseOffset)}px`;
      } else if (imgsrc.includes('hat')) {
        img.style.width = `${containerWidth * hatOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * hatOffset / 2, 0), containerWidth - containerWidth * hatOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * hatOffset / 2, 0), containerHeight - containerWidth * hatOffset)}px`;
      } else if (imgsrc.includes('muffler')) {
        img.style.width = `${containerWidth * mufflerOffset}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * mufflerOffset / 2, 0), containerWidth - containerWidth * mufflerOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * mufflerOffset / 2, 0), containerHeight - containerWidth * mufflerOffset)}px`;
      } else if (imgsrc.includes('outer')) {
        img.style.width = `${containerWidth * outerOffset}px`;
        img.style.height = 'auto';
        // X와 Y 좌표를 설정 (이미지의 너비/높이를 반영)
        img.style.left = `${Math.min(Math.max(x - (containerWidth * outerOffset) / 2, 0), containerWidth - containerWidth * outerOffset)}px`;
        img.style.top = `${Math.min(Math.max(y - (containerHeight * outerOffset) / 2, 0), containerHeight - containerHeight * outerOffset)}px`;
      }
      //당근코일떄만 좀 크게
      if (imgsrc.includes('carrot')) {
        img.style.width = `${containerWidth * noseOffset * 3}px`;
        img.style.height = 'auto';
        img.style.left = `${Math.min(Math.max(x - containerWidth * noseOffset, 0), containerWidth - containerWidth * noseOffset * 2)}px`;
        img.style.top = `${Math.min(Math.max(y - containerWidth * noseOffset, 0), containerHeight - containerWidth * noseOffset * 2)}px`;

      }
      
      
      img.style.objectFit = 'contain';
      container.appendChild(img);

      setImages((prevImages) => [...prevImages, img]);
      setRedoImages([]);
      setIsSnowmanExist(true);
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

      // shape 아이템이 제거된 경우 Recoil 상태 false로 설정
      if (lastImage.src.includes('shape') && !images.some((img) => img.src.includes('shape'))) {
        setIsShapeExist(false);
      }
    }
    if (images.length === 0) {
      setIsSnowmanExist(false); // 아이템이 모두 제거되면 false로 설정
    }
  };

  const handleRedo = () => {
    const lastRedoImage = redoImages.shift();
    if (lastRedoImage && containerRef.current) {
      containerRef.current.appendChild(lastRedoImage);
      setImages((prevImages) => [...prevImages, lastRedoImage]);
      setRedoImages([...redoImages]);
      setIsSnowmanExist(true); // Redo로 아이템이 추가되면 true로 설정
    }
  };

  const handleClearAll = () => {
    if (containerRef.current) {
      images.forEach((img) => containerRef.current?.removeChild(img));
      setImages([]);
      setRedoImages([]);
      setIsSnowmanExist(false); // 모두 초기화하면 false로 설정
      setIsShapeExist(false); // 모든 아이템 제거 시 false로 설정
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
        <>
  <NameInput
    placeholder="눈사람에게 이름을 지어주세요"
    value={snowman.name}
    onChange={(e) => {
      if (e.target.value.length <= 10) {
        setSnowman({ ...snowman, name: e.target.value });
      }
    }}
  />
  <CharCount>{snowman.name.length}/10</CharCount>
</>

      )}
    </Wrapper>
  );
});

export default MakePNG;

const CharCount = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: -10px;
`;

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
  height: 90%;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1%;
  width: 100%;
  height: 10%;
  z-index: 2;
`;

const ImgButton = styled.img<{ disabled?: boolean; visible?: boolean }>`
  height: 80%; // todo -< 크기 조정
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  z-index: 3;
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