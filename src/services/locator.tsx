import { useRecoilState, useSetRecoilState } from "recoil";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { locatorIdState, snowmanLocState } from "../contexts/recoilAtoms";

const Locator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowman, setSnowman] = useRecoilState(snowmanLocState);
  const setId = useSetRecoilState(locatorIdState);
  const { id } = useParams();

  useEffect(() => {
    setSnowman(snowman);
    console.log("Updated snowman:", snowman);
  }, [snowman]);

  useEffect(() => {
    setId(id);
    console.log("Updated id:", id);
  }, [id, setId]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const snowmanSize = 50;

    const x = e.clientX - containerRect.left - snowmanSize / 1.5;
    const y = e.clientY - containerRect.top - snowmanSize / 2;

    setSnowman({ x, y });
    // console.log("Updated snowman:", snowman);
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
