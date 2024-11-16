import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectedItemState } from '../../../contexts/snowmanState';

interface SecFeatCardProps {
  name: string;
  img: string;
}

const SecFeatCard: React.FC<SecFeatCardProps> = ({ name, img }) => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  const handleClick = () => {
    setSelectedItem({ imgSrc: img, name }); // 클릭된 아이템 정보 저장
  };

  return (
    <Wrapper onClick={handleClick}>
      <Image src={img} alt={name} />
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default SecFeatCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: auto;
  cursor: pointer;
`;

const Image = styled.img`
  height: auto;
  max-width: 80%;
  margin-bottom: 8px;
  object-fit: contain;
  user-select: none;
`;

const Name = styled.p`
  font-family: sans-serif;
  font-size: 0.9rem;
  text-align: center;
  color: #513421;
`;
