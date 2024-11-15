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

export const patchUsername = async () => {
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

export const getMySnowman = async () => {
  try {
    const response = await axios.get(`${URL}/my-snowman`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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

// 테스트 함수 예시 (주석 제거 시 테스트 용도로 사용할 수 있습니다)
// const getMemberTest = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.log("Token not found");
//     return;
//   }
//   const response = await fetch("https://nuneddine.p-e.kr/api/v1/member", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (response.ok) {
//     const data = await response.json();
//     console.log(data);
//   } else {
//     console.log("Failed to get member test");
//   }
// }
