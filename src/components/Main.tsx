import React, { ReactNode } from "react"
import styled from "styled-components"

interface MainProps {
   children: ReactNode; // children 타입을 명시적으로 설정
 }

const Main: React.FC<MainProps> = ( {children} ) => {
   return (
      <Wrapper>
         {children}
      </Wrapper>
   )
}

export default Main

const Wrapper = styled.div`
   width: 100%;
   height: 93%;
   display: flex;
   flex-direction: column;

   border: 2px solid #ee00ff;
`