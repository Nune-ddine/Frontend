import axios from 'axios';
import URL from '../constants/constants';

export const getMember = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${URL}/member`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    alert('로그인이 필요합니다.');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  console.log(response);
}
export const patchUsername = async (username: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${URL}/member/username`,
      { username: `${username}` }, // data payload
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post username:", error);
    throw error;
  }
};

export const getMySnowman = async () => {
  const response = await axios.get(`${URL}/my-snowman`, {
    method: 'GET',
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

  console.log(response);
}

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