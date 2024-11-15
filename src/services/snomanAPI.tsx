import axios from "axios";

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

export const createSnowman = async () => {
const token = localStorage.getItem("token");
if (!token) {
   console.log("Token not found");
   return;
}

try {
   const response = await axios.post("https://nuneddine.p-e.kr/api/v1/map/1/snowman", {
      name: "수쨩테스트",
      image: "이미지링크",
      posX: 2,
      posY: 3,
      quiz: "퀴즈",
      answerId: 3,
      content1: "보기1",
      content2: "보기2",
      content3: "보기3"
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