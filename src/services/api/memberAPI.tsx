import axios from 'axios';
import URL from '../../constants/constants';

const token = localStorage.getItem("token");

export const getMember = async () => {
  try {
    const response = await axios.get(`${URL}/member`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      alert('로그인이 필요합니다.');
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    throw error;
  }
};

export const patchUsername = async (newUsername: string) => {
  if (!token) {
    console.log("Token not found");
    return;
  }

  try {
    const response = await axios.patch(
      "https://nuneddine.p-e.kr/api/v1/member/username",
      {
        username: newUsername,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Username updated successfully:", response.data);
    return response.data; // Return the response if needed
  } catch (error) {
    console.error("Failed to update username:", error);
    throw error; // Rethrow the error for better error handling
  }
};


export const getMySnowman = async () => {
  try {
    const response = await axios.get(`${URL}/my-snowman`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      alert('로그인이 필요합니다.');
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch snowman data:", error);
    throw error;
  }
};

export const deleteMySnowman = async (snowmanId : number) => {
  try {
    const response = await axios.delete(`${URL}/my-snowman/${snowmanId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      alert('로그인이 필요합니다.');
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch snowman data:", error);
    throw error;
  }
};