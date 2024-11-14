import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

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

      let imgWidth = 100, imgHeight = 100;
      if (imgSrc.includes('shape')) {
        imgWidth = 400;
        imgHeight = 400;
      } else if (imgSrc.includes('eye') || imgSrc.includes('mouth')) {
        imgWidth = 50;
        imgHeight = 50;
      } else if (imgSrc.includes('hat') || imgSrc.includes('scarf')) {
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
      setRedoImages([]); // Reset redoImages
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
      {!isQuizMode && (
        <ButtonContainer>
          {images.length > 0 && (
            <>
              <Button onClick={handleUndo} disabled={images.length === 0}>
                <div>{'<-'}</div>
              </Button>
              <Button onClick={handleClearAll} disabled={images.length === 0}>
                <div>Clear All</div>
              </Button>
            </>
          )}
          {redoImages.length > 0 && (
            <Button onClick={handleRedo} disabled={redoImages.length === 0}>
              <div>{'->'}</div>
            </Button>
          )}
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
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #FFE2A4;
  border-radius: 100px;
  width: auto; 
  padding: 2px;
  border: 1px solid #513421;
  font-size: 11px;
  color: #513421;

  div {
    background-color: #FFF1D2;
    border-radius: 100px;
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;
