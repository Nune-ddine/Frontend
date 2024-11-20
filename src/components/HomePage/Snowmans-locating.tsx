import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllSnowman, getSomeSnowman } from "../../services/api/homeAPI";
// import QuizModal from "../Quiz";


interface Snowman {
  id: number;
  image: string | null;
  posX: number;
  posY: number;
}

const Snowmans: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { id } = useParams();
  const [snowmen, setSnowmen] = useState<Snowman[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [selectedSnowmanId, setSelectedSnowmanId] = useState<number | null>(null);
  const navigate = useNavigate();

  const getSnowmans = async () => {
    if (!id) {
      console.error("Map number is undefined");
      return;
    }
  
    try {
      const response: Snowman[] = await getSomeSnowman(id);
      // Filter valid snowman data (with image, non-zero positions, and valid x, y range)
      const validSnowmen = response.filter(
        (snowman) =>
          snowman.image &&
          snowman.image.trim() !== "" &&
          (snowman.posX > 0 &&
            snowman.posX <= 100 &&
            snowman.posY > 0 &&
            snowman.posY <= 100)
      );
      setSnowmen(validSnowmen);
      console.log("Valid snowmen:", validSnowmen);
    } catch (error) {
      console.error("Error fetching snowman data:", error);
    }
  };  

  useEffect(() => {
    getSnowmans();
  }, [id]);

  return (
    <div style={{ position: "relative", height: "100%" }}>
    <img onClick={() => navigate('/elevator2')} src='/images/homes/map.png' 
    style={{width:"24%", position: "relative", zIndex: 2, cursor:'pointer'}} /> 
      {snowmen.map((snowman) => (
        <StyledSnowman
          key={snowman.id}
          src={`${snowman.image}` || `/images/etc/puangman.png`}
          style={{
            top: `${snowman.posY}%`,
            left: `${snowman.posX}%`,
            position: "absolute",
            objectFit: "cover",
          }}
          // onClick={() => viewQuiz(snowman.id)}
        />
      ))}
      {children}
      {/* <QuizModal isOpen={isModalOpen} onClose={closeModal} snowmanId={selectedSnowmanId} /> */}
    </div>
  );
};

export default Snowmans;

const StyledSnowman = styled.img`
  position: absolute;
  height: 50px;
  width: 40px;
  z-index: 1;
  cursor: pointer;
  // border : 1px solid black;
`;
