import axios from "axios";
import type { SnowmanState } from "../contexts/snowmanState";

export const getMember = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.get("https://nuneddine.p-e.kr/api/v1/member", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });

   console.log(response.data);
} catch (error) {
   console.error("Failed to get member test", error);
}
};

export const getGotcha = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/gotcha", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });

   console.log(response.data);
} catch (error) {
   console.error("Failed to get gotcha test", error);
}
}

export const patchMember = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.patch("https://nuneddine.p-e.kr/api/v1/member/username", {
      username: "테스트 닉네임",
   }, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });

   console.log(response.data);
} catch (error) {
   console.error("Failed to patch member test", error);
}
};

export const getInventory = async () => {
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

export const getAllSnowman = async () => {
try {
   const response = await axios.get("https://nuneddine.p-e.kr/api/v1/map/1");
   console.log(response.data);
} catch (error) {
   console.error("Failed to fetch all snowman data", error);
}
};

export const getSnowmanQuiz = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.get("https://nuneddine.p-e.kr/api/v1/snowman/1", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });

   console.log(response.data);
} catch (error) {
   console.error("Failed to get snowman quiz test", error);
}
};

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

export const getMySnowmans = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.get("https://nuneddine.p-e.kr/api/v1/my-snowman", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });
   console.log(response.data);
} catch (error) {
   console.error("Failed to get my snowmans", error);
}
}

export const getSnowmanInfo = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.get("https://nuneddine.p-e.kr/api/v1/snowman/detail/1", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });
   console.log(response.data);
} catch (error) {
   console.error("Failed to get snowman info", error);
}
}

export const trySnowmanQuiz = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.post("https://nuneddine.p-e.kr/api/v1/snowman/2", {
      number: 1
   }, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
   });
   console.log(response.data);
} catch (error) {
   console.error("Failed to try snowman quiz", error);
}
}