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
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
    
        setSnowmen((prevSnowmen) => [...prevSnowmen, { x, y }]);
      
        // try {
        //   await fetch("API_URL", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ x, y }),
        //   });
        //   console.log("Coordinates sent to API:", { x, y });
        // } catch (error) {
        //   console.error("Error sending coordinates to API:", error);
        // }
      };

  return (
    <div 
    ref={containerRef}
    onClick={handleClick} 
    style={{ position: "relative", height: "100vh" }}>
      {snowmen.map((snowman, index) => (
        <Snowman key={index} style={{ top: `${snowman.y}px`, left: `${snowman.x}px` }} />
      ))}
    </div>
  )
}

export default Locator;

const Snowman = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid black;
`;