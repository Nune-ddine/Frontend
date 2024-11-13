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
         <QuizTextarea>

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
   color: black;
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
   box-sizing: border-box;

   color: black;
   font-family: 'Maplestory-Bold', sans-serif;
   font-weight: bold;
`

const QuizTextarea = styled.textarea`
   width: 100%;
   height: 80%;
   box-sizing: border-box;
   border: none;
   border-radius: 15px;
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
   width: 10%;
   height: 100%;
   box-sizing: border-box;
   background-color: white;
   border-radius: 10px;
`
const OptionInput = styled.input`
   width: 90%;
   height: 100%;
   box-sizing: border-box;
   padding-left: 20px;
   border: none;
   border-radius: 8px;
   font-family: 'Maplestory-Light', sans-serif;
`