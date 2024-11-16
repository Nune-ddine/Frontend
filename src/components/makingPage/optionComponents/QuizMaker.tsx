import styled from "styled-components";
import { snowmanState } from "../../../contexts/snowmanState";
import axios from "axios";
import { useRecoilState } from "recoil";

const QuizMaker = () => {
   const [snowman, setSnowman] = useRecoilState(snowmanState);

   const createSnowman = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
         console.log("Token not found");
         return;
      }

      try {
         const response = await axios.post(
         "https://nuneddine.p-e.kr/api/v1/map/1/snowman",
         {
            name: "수쨩테스트",
            image: "이미지링크",
            posX: 2,
            posY: 3,
            quiz: "퀴즈",
            answerId: snowman.answerId,
            content1: "보기1",
            content2: "보기2",
            content3: "보기3",
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
         );
         console.log(response.data);
      } catch (error) {
         console.error("Failed to create snowman", error);
      }
   };

   return (
      <Wrapper>
         <Title>친구들이 맞힐 문제를 만들어주세요!</Title>
         <QuizContainer>
         <QuizSubtitle>문제 입력(15자 이내)</QuizSubtitle>
         <QuizTextarea
            type="text"
            placeholder="문제를 입력해주세요"
            onChange={(e) =>
               setSnowman({ ...snowman, quiz: e.target.value })
            }
            value={snowman.quiz}
         />
         </QuizContainer>
         <OptionContainer>
         <OptionSubtitle>보기 입력(15자 이내)</OptionSubtitle>
         <Options>
            <Option>
               <OptionNum
               selected={snowman.answerId === 1}
               onClick={() => setSnowman({ ...snowman, answerId: 1 })}
               >
               1
               </OptionNum>
               <OptionInput
               type="text"
               placeholder="보기를 입력해주세요"
               onChange={(e) =>
                  setSnowman({ ...snowman, content1: e.target.value })
               }
               value={snowman.content1}
               selected={snowman.answerId === 1}
               />
            </Option>
            <Option>
               <OptionNum
               selected={snowman.answerId === 2}
               onClick={() => setSnowman({ ...snowman, answerId: 2 })}
               >
               2
               </OptionNum>
               <OptionInput
               type="text"
               placeholder="보기를 입력해주세요"
               onChange={(e) =>
                  setSnowman({ ...snowman, content2: e.target.value })
               }
               value={snowman.content2}
               selected={snowman.answerId === 2}
               />
            </Option>
            <Option>
               <OptionNum
               selected={snowman.answerId === 3}
               onClick={() => setSnowman({ ...snowman, answerId: 3 })}
               >
               3
               </OptionNum>
               <OptionInput
               type="text"
               placeholder="보기를 입력해주세요"
               onChange={(e) =>
                  setSnowman({ ...snowman, content3: e.target.value })
               }
               value={snowman.content3}
               selected={snowman.answerId === 3}
               />
            </Option>
            <span>* 보기 입력 후 정답인 번호를 눌러주세요</span>
         </Options>
         </OptionContainer>
      </Wrapper>
   );
};

export default QuizMaker;

// 스타일 정의는 동일합니다.


const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
   padding: 20px;
   padding-bottom: 0;
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
const QuizSubtitle = styled.div`
   width: 100%;
   height: 20%;

   color: #513421;
   font-family: 'Maplestory-Bold', sans-serif;
   font-weight: bold;
`
const OptionSubtitle = styled.div`
   width: 100%;
   height: 13%;

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
   color: #513421;
   font-weight: 600;
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

const OptionNum = styled.div<{ selected: boolean }>`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   color: #513421;
   width: 10%;
   height: 100%;
   border: 1px solid #513421;
   box-sizing: border-box; 
   border-radius: 4px;
   cursor: pointer;

   // 선택됐을 때 색상 변경
   background-color: ${(props) => (props.selected ? "#6BEA5A" : "#FFDD94")};
`;

const OptionInput = styled.input<{ selected: boolean }>`
   width: 90%;
   height: 100%;
   box-sizing: border-box;
   padding-left: 20px;
   border: 1px solid #513421;
   border-radius: 4px;
   font-family: sans-serif;
   color: #513421;
   font-size: 12px;
   font-weight: 600;

   // 선택됐을 때 색상 변경
   background-color: ${(props) => (props.selected ? "#E3FFE3" : "#FFDD94")};
`