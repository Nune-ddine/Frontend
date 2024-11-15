import styled from "styled-components"

const QuizMaker = () => {
return (
   <Wrapper>
      <Title>
         친구들이 맞힐 문제를 만들어주세요!
      </Title>
      <QuizContainer>
         <Subtitle>
            문제 입력(15자 이내)
         </Subtitle>
         <QuizTextarea placeholder="문제를 입력해주세요">

         </QuizTextarea>
      </QuizContainer>
      <OptionContainer>
         <Subtitle>
            보기 입력(15자 이내)
         </Subtitle>
         <Options>
            <Option>
               <OptionNum>1</OptionNum>
               <OptionInput placeholder="보기를 입력해주세요"></OptionInput>
            </Option>
            <Option>
               <OptionNum>2</OptionNum>
               <OptionInput placeholder="보기를 입력해주세요"></OptionInput>
            </Option>
            <Option>
               <OptionNum>3</OptionNum>
               <OptionInput placeholder="보기를 입력해주세요"></OptionInput>  
            </Option>
            <span>* 보기 입력 후 정답인 번호를 눌러주세요</span>
         </Options>
      </OptionContainer>
   </Wrapper>
)
}

export default QuizMaker

const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
   padding: 20px;
   gap: 10px;
`

const Title = styled.div`
   width: 100%;
   height: 10%;
   box-sizing: border-box;

   font-family: 'Maplestory-Bold', sans-serif;
   font-weight: bold;
   font-size: 20px;
   color: #513421;
`

const QuizContainer = styled.div`
   width: 100%;
   height: 30%;
   box-sizing: border-box;
`  

const OptionContainer = styled.div`
   width: 100%;
   height: 50%;
   box-sizing: border-box;
`
const Subtitle = styled.div`
   width: 100%;
   height: 20%;

   color: #513421;
   font-family: 'Maplestory-Bold', sans-serif;
   font-weight: bold;
`

const QuizTextarea = styled.input`
   width: 100%;
   height: 70%;
   box-sizing: border-box;
   border: 1px solid #513421;
   border-radius: 4px;
   background-color: #FFF1D2;
   font-family: sans-serif;
   padding-left: 20px;
   padding-right: 20px;
   //placeholder 크기 조절
   font-size: 12px;
` 

const Options = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 100%;
   height: 80%;
   box-sizing: border-box;
   gap: 10px;
   font-family: 'Maplestory-Bold', sans-serif;

   span {
      color: #513421;
      font-size: 10px;
      font-family: sans-serif;
   }
`



const Option = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   box-sizing: border-box;

   gap: 10px;
`

const OptionNum = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   color: #513421;
   width: 10%;
   height: 100%;
   border: 1px solid #513421;
   box-sizing: border-box;
   background-color: #FFDD94;
   border-radius: 4px;
`
const OptionInput = styled.input`
   width: 90%;
   height: 100%;
   box-sizing: border-box;
   padding-left: 20px;
   border: 1px solid #513421;
   border-radius: 4px;
   font-family: sans-serif;
   color: #513421;
   background-color: #FFF1D2;
   font-size: 12px;
`