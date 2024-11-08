import axios from 'axios';

//백엔드로 인가 코드(카카오) 보내는 함수
export const sendKakaoCode = async (code: string) => {
   try {
      const response = await axios.post("http://43.201.46.230:8080/api/v1/cors/jwt", { code });
      console.log("< 카카오 인증 처리 결과 >");
      console.log(response.data);

   } catch (error) {
      console.error("구글 인증 처리 중 오류 발생:", error);
   }
}