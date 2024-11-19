import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface WrapperProps {
    id: string;
    backgroundImages: Record<string, string>;
}

const BackgroundWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { id } = useParams<{ id: string }>();

    const backgroundimages: Record<string, string> = {
        "1": "/images/homes/backgrounds/1.png",
        "2": "/images/homes/backgrounds/2.png",
        "3": "/images/homes/backgrounds/3.png",
        "4": "/images/homes/backgrounds/4.png",
        "5": "/images/homes/backgrounds/5.png",
    };

    return (
        id ? (
            <Wrapper id={id} backgroundImages={backgroundimages}>
                {children}
            </Wrapper>
        ) : null
    );
};

export default BackgroundWrapper;

const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url(${({ id, backgroundImages }) => backgroundImages[id]}) no-repeat center center;
  background-size: cover;
  font-family: 'MaplestoryOTFBold';
`;