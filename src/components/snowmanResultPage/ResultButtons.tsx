import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const ResultButtons = () => {
   const navigate = useNavigate();

   const handleJaRang = () => {
      // 시스템 자체 공유 기능 팝업
      if (navigator.share) {
         navigator.share({
               title: '눈사람 공작소',
               text: '나만의 눈사람을 만들어보세요!',
               url: 'https://snowman-factory-develop.netlify.app/1',
         });
      }else{
         alert("공유하기가 지원되지 않는 환경 입니다.")
      }
      console.log('자랑하기 성공')

      //or 클립보드에 링크 복사
      // navigator.clipboard.writeText('https://snowman-factory-develop.netlify.app')
      // .then(() => {
      //    alert('링크가 복사되었어요!')
      // })
      // .catch((error) => {
      //    alert('링크 복사에 실패했어요 ㅠ.ㅠ')
      // });
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