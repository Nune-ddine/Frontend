import axios from "axios";
import { SnowmanState } from "../../contexts/snowmanState";
import { locatorIdState } from "../../contexts/recoilAtoms";

   export const createSnowman = async (snowman: SnowmanState) => {
      const mapNumber = locatorIdState;
      const token = localStorage.getItem("token");
      console.log("<< createSnowman test >>");
      if (!token) {
      console.log("Token not found");
      return;
      }

      //snowman의 모든 필드가 입력되어있는지 확인 - exception handling
      if (!snowman.name)
         alert("눈사람의 이름을 입력해주세요!");
      if (!snowman.image)
         alert("아직 눈사람의 형태가 없어요!");
      if (!snowman.quiz)
         alert("문제를 입력해주세요!");
      if (!snowman.answerId)
         alert("입력하신 보기 중 정답을 골라주세요!");
      if (!snowman.content1 || !snowman.content2 || !snowman.content3)
         alert("보기를 모두 입력해주세요!!");
      
   
      try {
      const response = await axios.post(`https://nuneddine.p-e.kr/api/v1/map/${mapNumber}/snowman`, {
         name: snowman.name,
         image: snowman.image,
         posX: 1000, // todo
         posY: 20000, // todo
         quiz: snowman.quiz,
         answerId: snowman.answerId,
         content1: snowman.content1,
         content2: snowman.content2,
         content3: snowman.content3,
      }, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      console.log(response);
      } catch (error: any) {
      console.error("Failed to create snowman", error);
   
      // 에러 객체에서 응답 데이터 추출
      if (error.response && error.response.data) {
         console.log("Error message:", error.response.data.message);
      } else {
         console.log("An unexpected error occurred.");
      }
      }
   };
 

export const getInventory = async () => {
   console.log("getInventory");
   const token = localStorage.getItem("token");
   if (!token) {
      console.log("Token not found");
      return;
   }
   
   try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/inventory", {
         headers: {
         Authorization: `Bearer ${token}`,
         },
      });
      // console.log(response.data);
   } catch (error) {
      console.error("Failed to get inventory test", error);
   }
   };