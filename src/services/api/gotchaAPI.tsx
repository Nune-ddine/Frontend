import axios from "axios";
const token = localStorage.getItem("token");


export const getGotcha = async () => {
    if (!token) {
      console.log("Token not found");
      return;
    }
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/item/gatcha", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get gotcha test", error);
    }
  }