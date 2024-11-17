import React from 'react'
import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface WrapperProps {
    id: string;
    backgroundImages: Record<string, string>;
}

const BackgroundWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { id } =useParams();

    const backgroundImages = {
        "1": "/images/homes/backgrounds/1.png",
        "2": "/images/homes/backgrounds/2.png",
        "3": "/images/homes/backgrounds/3.png",
        "4": "/images/homes/backgrounds/4.png",
        "5": "/images/homes/backgrounds/5.png",
      };

  return (
    <Wrapper id={id} backgroundImages={backgroundImages}>
        {children}
    </Wrapper>
  )
}

export default BackgroundWrapper;

const Wrapper = styled.div<WrapperProps>`
  height : 100%;
  display : flex;
  flex-direction: column;
  justify-content : space-between;
  background: url(${({ id, backgroundImages }) => backgroundImages[id]}) no-repeat center center;
  background-size: cover;
  font-family: 'MaplestoryOTFBold';
`