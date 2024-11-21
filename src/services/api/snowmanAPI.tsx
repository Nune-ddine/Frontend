import axios from "axios";
import { SnowmanState } from "../../contexts/snowmanState";
import { locatorIdState } from "../../contexts/recoilAtoms";
import { useRecoilState, useRecoilValue } from "recoil";

   export const createSnowman = async (snowman: SnowmanState, mapNumber: string|undefined) => {
      console.log("mapNumber: ", mapNumber);
      const token = localStorage.getItem("token");
      console.log("<< createSnowman API 호출됨 >>");
      if (!token) {
      console.log("Token not found");
      return;
      }

      try {
      const response = await axios.post(`https://nuneddine.p-e.kr/api/v1/map/${mapNumber}/snowman`, { //todo, mapNumber
         name: snowman.name,
         image: snowman.image,
         posX: snowman.posX || 160, //todo
         posY: snowman.posY || 240, 
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
      // console.log(response);
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
   // console.log("getInventory");
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
      return response.data;
   } catch (error) {
      console.error("Failed to get inventory test", error);
   }

   };