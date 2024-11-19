import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface WrapperProps {
    id: string;
    backgroundImages: Record<string, string>;
}

const OnboardingWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { id } = useParams<{ id: string }>();

    const backgroundimages: Record<string, string> = {
        "1": "/images/onboarding/1.png",
        "2": "/images/onboarding/2.png",
        "3": "/images/onboarding/3.png",
        "4": "/images/onboarding/4.png",
        "5": "/images/onboarding/5.png",
        "6": "/images/onboarding/6.png",
    };

    return (
        id ? (
            <Wrapper id={id} backgroundImages={backgroundimages}>
                {children}
            </Wrapper>
        ) : null
    );
};

export default OnboardingWrapper;

const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  width : 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: url(${({ id, backgroundImages }) => backgroundImages[id]}) no-repeat center center;
  background-size: cover;
  font-family: 'MaplestoryOTFBold';
`;