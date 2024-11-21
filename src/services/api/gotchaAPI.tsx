import axios from "axios";
import { GotchaResponse } from "../../components/GotchaPage/Gotcha";

const token = localStorage.getItem("token");

export const getGotcha = async (): Promise<GotchaResponse | null> => {
  if (!token) {
    console.error("Token not found");
    return null;
  }

  try {
    const response = await axios.get<GotchaResponse>("https://nuneddine.p-e.kr/api/v1/item/gotcha", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get gotcha data:", error);
    return null;
  }
};
