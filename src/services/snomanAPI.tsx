import axios from "axios";
import type { SnowmanState } from "../contexts/snowmanState";


export const createSnowman = async ( snowman: SnowmanState ) => { //todo -> mapnumber도 바꿔야함
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.post("https://nuneddine.p-e.kr/api/v1/map/1/snowman", {
      name: snowman.name,
      image: snowman.image,
      posX: 2, //todo
      posY: 3, //todo
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
   console.log(response.data); 
} catch (error) {
   console.error("Failed to create snowman", error);
}
};

export const getInventory = async () => {
   console.log("getInventory test");
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
   
      console.log(response.data);
   } catch (error) {
      console.error("Failed to get inventory test", error);
   }
   };