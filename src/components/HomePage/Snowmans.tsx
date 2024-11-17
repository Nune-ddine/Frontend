import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllSnowman } from "../../services/api/homeAPI";

interface Snowman {
  id: number;
  image: string | null;
  posX: number;
  posY: number;
}

const Snowmans: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { id } = useParams();
  const [snowmen, setSnowmen] = useState<Snowman[]>([]);

  const getSnowmans = async () => {
    if (!id) {
      console.error("Map number is undefined");
      return;
    }

    try {
      const response: Snowman[] = await getAllSnowman(id);
      // Filter valid snowman data (with image and non-zero positions)
      const validSnowmen = response.filter(
        (snowman) =>
          snowman.image &&
          snowman.image.trim() !== "" &&
          (snowman.posX !== 0 || snowman.posY !== 0)
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
    <div style={{ position: "relative", height: "100%", border: "1px solid black" }}>
      {snowmen.map((snowman) => (
        <StyledSnowman
          key={snowman.id}
          src={`${snowman.image}`||`/images/etc/puangman.png`}
          style={{
            top: `${snowman.posY}px`,
            left: `${snowman.posX}px`,
          }}
        />
      ))}
      {children} {/* children을 포함하여 추가적인 렌더링을 지원 */}
    </div>
  );
};

export default Snowmans;

const StyledSnowman = styled.img`
  position: absolute;
  
  
  height: 50px;
  width: 70px;
`;