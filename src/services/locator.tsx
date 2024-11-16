import { useRecoilState, useSetRecoilState } from "recoil";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { locatorIdState, snowmanState } from "../contexts/recoilAtoms";

const Locator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowman, setSnowman] = useRecoilState(snowmanState);
  const setId = useSetRecoilState(locatorIdState);
  const { id } = useParams();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const snowmanSize = 50;

    const x = e.clientX - containerRect.left - snowmanSize / 1.5;
    const y = e.clientY - containerRect.top - snowmanSize / 2;

    setSnowman({ x, y });
    setId(id);
    console.log(snowman, id);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{ position: "relative", height: "100vh" }}
    >
      {snowman && (
        <Snowman
          src="/images/etc/puangman.png"
          style={{ top: `${snowman.y}px`, left: `${snowman.x}px` }}
        />
      )}
    </div>
  );
};

export default Locator;

const Snowman = styled.img`
  position: absolute;
  height: 50px;
`;
