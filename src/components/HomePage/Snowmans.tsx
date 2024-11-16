import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSnowman } from '../../services/api/homeAPI';

interface Snowman {
  id: number;
  image: string;
  posX: number;
  posY: number;
}

const Snowmans: React.FC = () => {
  const { id } = useParams();

  const getSnowmans = async () => {
    if (!id) {
      console.error("Map number is undefined");
      return;
    }

    try {
      const response: Snowman[] = await getAllSnowman(id); // Assuming the API returns an array of Snowman objects
      console.log("Snowman data:", response);
    } catch (error) {
      console.error("Error fetching snowman data:", error);
    }
  };

  useEffect(() => {
    getSnowmans();
  }, [id]); // Dependency ensures it runs only when mapNum changes

  return (
    <div
    style={{border:"1px solid black", height:"80vh"}}>
      <h1>Snowman Data</h1>
    </div>
  );
};

export default Snowmans;