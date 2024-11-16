import axios from "axios";
import URL from "../../constants/constants";

const token = localStorage.getItem("token");

export const getAllSnowman = async () => {
    try {
      const response = await axios.get("https://nuneddine.p-e.kr/api/v1/map/1");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch all snowman data", error);
    }
  };

export const getSnowmanQuiz = async () => {
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    try {
      const response = await axios.get(`${URL}/snowman/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get snowman quiz test", error);
    }
  };

  