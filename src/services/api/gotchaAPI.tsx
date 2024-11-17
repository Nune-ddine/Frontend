import axios from "axios";

export interface GotchaItem {
  itemName: string;
  itemId: number;
}

const token = localStorage.getItem("token");

export const getGotcha = async (): Promise<GotchaItem | null> => {
  if (!token) {
    console.error("Token not found");
    return null;
  }

  try {
    const response = await axios.get<GotchaItem>("https://nuneddine.p-e.kr/api/v1/item/gotcha", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get gotcha data:", error);
    return null;
  }
};
