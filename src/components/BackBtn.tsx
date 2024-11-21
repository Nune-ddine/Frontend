import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { locatorIdState } from '../contexts/recoilAtoms';

const BackBtn = () => {
    const navigate = useNavigate();
    const id = useRecoilValue(locatorIdState);
  return (
    // <BackButton onClick={()=>navigate('/')}>◀</BackButton>
    <BackButton src="/images/etc/leftBtn.png" onClick={() => navigate(`/${id}`)}/>
  )
}

export default BackBtn

// export const BackButton = styled.button`
//   top: 0;
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   background-color: #FFE2A4;
//   border-radius: 100px;
//   margin-left: 2%;
//   width: 9%;
//   height: 5%;
//   padding: 10px;
//   border: 1px solid #513421;
//   font-size: 11px;
//   color: #513421;
//   div {
//     background-color: #FFF1D2;
//     border-radius: 100px;
//     padding: 2px;
//     padding-left: 8px;
//     padding-right: 8px;
//   }
// `;

const BackButton = styled.img`
  // padding-bottom: 15px;
  margin-left : 1rem;
  // margin-top : 1rem;
  height: 5%;
  width: 9%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;