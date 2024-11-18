import axios from 'axios';
import URL from '../../constants/constants';

const token = localStorage.getItem("token");

export const getQuiz = async (id : number) => {
  try {
    const response = await axios.get(`${URL}/snowman/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      alert('로그인이 필요합니다.');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    // console.log(response);

    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    throw error;
  }
};

export const postQuiz = async (id: number, answer: number) => {
    try {
      const response = await axios.post(
        `${URL}/snowman/${id}`,
        { number: answer }, // 요청 본문에 데이터 추가
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 401) {
        alert('로그인이 필요합니다.');
        localStorage.removeItem('token');
        window.location.href = '/';
      }
  
      return response.data; // 서버의 응답 데이터 반환
    } catch (error) {
      console.error("Failed to post quiz answer:", error);
      throw error;
    }
  };
