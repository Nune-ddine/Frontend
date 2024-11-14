import { useState, useRef } from "react";
import styled from "styled-components";

interface Snowman {
    x: number;
    y: number;
}

const Locator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowmen, setSnowmen] = useState<Snowman[]>([]);

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const snowmanSize = 50; // Size of the Snowman (width/height)

    const x = e.clientX - containerRect.left - snowmanSize / 2;
    const y = e.clientY - containerRect.top - snowmanSize / 2;

    setSnowmen((prevSnowmen) => [...prevSnowmen, { x, y }]);
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick} 
      style={{ position: "relative", height: "100vh" }}
    >
      {snowmen.map((snowman, index) => (
        <Snowman key={index} style={{ top: `${snowman.y}px`, left: `${snowman.x}px` }} />
      ))}
    </div>
  );
};

export default Locator;

const Snowman = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid black;
`;
