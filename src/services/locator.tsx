import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Snowman {
    x: number;
    y: number;
}

const Locator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowmen, setSnowmen] = useState<Snowman[]>([]);
  const { id } = useParams();

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const snowmanSize = 50;

    const x = e.clientX - containerRect.left - snowmanSize / 1.5;
    const y = e.clientY - containerRect.top - snowmanSize / 2;

    setSnowmen((prevSnowmen) => [...prevSnowmen, { x, y }]);

    // console.log(`x: ${x}, y: ${y}`);
    // console.log(id);
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick} 
      style={{ position: "relative", height: "100vh" }}
    >
      {snowmen.map((snowman, index) => (
        <Snowman src='/images/etc/puangman.png'key={index} style={{ top: `${snowman.y}px`, left: `${snowman.x}px`, }} />
      ))}
    </div>
  );
};

export default Locator;

const Snowman = styled.img`
  position: absolute;
  height: 50px;
`;
