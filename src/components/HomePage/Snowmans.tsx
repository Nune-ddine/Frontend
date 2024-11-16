import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSnowman } from '../../services/api/homeAPI';

interface Snowman {
  id: number;
  image: string;
  posX: number;
  posY: number;
}

const Snowmans: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { id } = useParams();
  
    const getSnowmans = async () => {
      if (!id) {
        console.error("Map number is undefined");
        return;
      }
  
      try {
        const response: Snowman[] = await getAllSnowman(id);
        console.log("Snowman data:", response);
      } catch (error) {
        console.error("Error fetching snowman data:", error);
      }
    };
  
    useEffect(() => {
      getSnowmans();
    }, [id]);
  
    return (
      <div style={{ border: "1px solid black", height: "100%" }}>
        <h1>Snowman Data</h1>
        {children} {/* children을 렌더링 */}
      </div>
    );
  };
  
export default Snowmans;
  