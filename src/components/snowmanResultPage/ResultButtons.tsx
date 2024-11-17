import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const ResultButtons = () => {
   const navigate = useNavigate();

   const handleJaRang = () => {
      if (navigator.share) {
         navigator.share({
               title: '기록하며 성장하기',
               text: 'Hello World',
               url: 'https://shinsangeun.github.io',
         });
      }else{
         alert("공유하기가 지원되지 않는 환경 입니다.")
      }
      console.log('자랑하기')
   }

return (
   <Wrappper>
      <JaRangButton>눈사람 자랑하기</JaRangButton> 
      <MapButton onClick={() => navigate('/')}>맵으로 돌아가기</MapButton>
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
   justify-content: start;
   font-family: 'Maplestory-Bold', sans-serif;
   padding-top: 5%;
   box-sizing: border-box;
`
const JaRangButton = styled.button`
   width: 70%;
   height: 25%;
   margin-top: 1rem;
   padding: 0.5rem;
   border: 1px solid #513421;
   background-color: #3D9BF2;
   color: white;
   border-radius: 100px;
   box-sizing: border-box;
   font-size: 1.5rem;
   text-align: center;
`

const MapButton = styled.button`
   width: 70%;
   height: 25%;
   margin-top: 1rem;
   padding: 0.5rem;
   border: none;
   background-color: #C2E1FF;
   color: #3D9BF2;
   border-radius: 100px;
   box-sizing: border-box;
   font-size: 1.5rem;
   text-align: center;
`  