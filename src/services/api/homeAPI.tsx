import axios from "axios";
import URL from "../../constants/constants";

const token = localStorage.getItem("token");

export const getAllSnowman = async (snowmanId: string): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/map/${snowmanId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all snowman data", error);
    throw error;
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
  
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to get snowman quiz test", error);
    }
  };

export const getSomeSnowman = async (snowmanId: string): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/placement/all/${snowmanId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    // window.location.href = "/login";
    console.error("Failed to fetch all snowman data", error);
    throw error;
  }
};