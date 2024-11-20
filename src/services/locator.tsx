import { useRecoilState, useSetRecoilState } from "recoil";
import { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { locatorIdState } from "../contexts/recoilAtoms";
import { snowmanState } from "../contexts/snowmanState";
import Snowmans from "../components/HomePage/Snowmans-locating";

const Locator: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowman, setSnowman] = useRecoilState(snowmanState);
  const setId = useSetRecoilState(locatorIdState);
  const { id } = useParams();

  useEffect(() => {
    console.log("[ Updated Location ]:", snowman.posX, snowman.posY);
  }, [snowman]);

  useEffect(() => {
    setId(id);
    console.log("Updated id:", id);
  }, [id, setId]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const x = ((e.clientX - containerRect.left - 14) / containerRect.width) * 100;
    const y = ((e.clientY - containerRect.top -20) / containerRect.height) * 100;

    if(x>100){
      alert("눈사람은 학교 안에서만 만들 수 있어요!");
      return;
    }else if(x<0){      
      alert("눈사람은 학교 안에서만 만들 수 있어요!");
      return;
    }
    
    setSnowman((prev) => ({ ...prev, posX: x, posY: y }));
    // console.log("Updated snowman:", snowman);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // border:"1px solid black" 
      }}
    >
      <Snowmans />
      <StyledText>눈사람 만들 곳을 클릭해주세요!</StyledText>
      {snowman && (
        <Snowman
          src="/images/mypage/emptySnowman.png"
          style={{
            top: `${snowman.posY}%`,
            left: `${snowman.posX}%`,
            position: "absolute"
          }}
        ></Snowman>
      )}
      {children}
    </div>
  );
};

export default Locator;

const Snowman = styled.img`
  position: absolute;
  height: 40px;
  width: 28px;
  opacity :0.8;
  // border : 1px solid black;
`;

const StyledText = styled.div`
  font-size: 1.4rem;
  color: white;
  -webkit-text-stroke: 0.8px rgba(81, 52, 33, 1);
`;
