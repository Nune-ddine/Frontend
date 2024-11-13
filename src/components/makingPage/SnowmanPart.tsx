// src/components/SnowmanPart.tsx
import React from 'react';
import styled from 'styled-components';
import MakePNG from './MakePNG';

interface SnowmanPartProps {
  selectedImage: string;
  selectedFeature: string;
}

const SnowmanPart: React.FC<SnowmanPartProps> = ({ selectedImage, selectedFeature }) => {
  return (
    <Wrapper>
      <GotoMapBtn>MAP</GotoMapBtn>
      <SnowmanContainer>
        <MakePNG selectedImage={selectedImage} selectedFeature={selectedFeature} />
      </SnowmanContainer>
      <NextPage>{'>'}</NextPage>
    </Wrapper>
  );
};

export default SnowmanPart;

const Wrapper = styled.div`
   width: 100%;
   height: 45%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   border: 2px solid black;
`;

const SnowmanContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   border: 2px solid black;
`;

const GotoMapBtn = styled.button`
   width: 10%;
   height: 7%;
   background-color: grey;
   border: none;
   cursor: pointer;
`;

const NextPage = styled.button`
   height: 10%;
   aspect-ratio: 1;
   background-color: grey;
   border: none;
   border-radius: 50%;
   cursor: pointer;
`;
