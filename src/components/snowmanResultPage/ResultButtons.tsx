import styled from "styled-components"

const ResultButtons = () => {
return (
   <Wrappper>
      <JaRangButton>자랑하고 포인트 받기</JaRangButton> 
      <MapButton>맵으로 돌아가기</MapButton>
   </Wrappper>
)
}

export default ResultButtons

const Wrappper = styled.div`
   width : 100%;
   height: 30%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   font-family: 'Maplestory-Light', sans-serif;
   border: 2px solid grey;
`
const JaRangButton = styled.button`
   width: 70%;
   height: 30%;
   margin-top: 1rem;
   padding: 0.5rem;
   border: 1px solid #ccc;
   border-radius: 30px;
   box-sizing: border-box;
   font-size: 14px;
   text-align: center;
`

const MapButton = styled.button`
   width: 70%;
   height: 30%;
   margin-top: 1rem;
   padding: 0.5rem;
   border: 1px solid #ccc;
   border-radius: 30px;
   box-sizing: border-box;
   font-size: 14px;
   text-align: center;
`  