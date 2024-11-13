import URL from '../constants/constants';

export const getMember = async () => {
  const response = await fetch(`${URL}/member`, {
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
   return response.json();
}