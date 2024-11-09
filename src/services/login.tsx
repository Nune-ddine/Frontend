import axios from "axios";

// 백에 카카오 인가 코드 전송
export const sendKakaoCode = async (code: string) => {
   try {
      const response = await axios.post("http://43.201.46.230:8080/api/v1/oauth/kakao/token", 
      {
         "authorization_code": code
      });
      console.log("< 카카오 인증 처리 결과 >");
      console.log(response.data);

   } catch (error) {
      console.error("카카오 인증 처리 중 오류 발생:", error);
   }
}

// 백에 토큰 전송
export const sendToken = async (token: string) => {
   try {
      const response = await axios.post("http://43.201.46.230:8080/api/v1/cors/jwt",
      {
         "token": "Bearer " + token
      });
      console.log("< 토큰 인증 처리 결과 >");
      console.log(response.data);
   } catch (error) {
      console.error("토큰 인증 처리 중 오류 발생:", error);
   }
}

// 두 함수 한 번에: 최종 로그인
export const login = async (code: string) => {
   try {
      const response = await axios.post("http://43.201.46.230:8080/api/v1/oauth/kakao/token",
      {
         "authorization_code": code
      });
      console.log("< 카카오 인증 처리 결과 >");
      console.log(response.data);
      const token = response.data.token;
      const response2 = await axios.get("http://43.201.46.230:8080/api/v1/cors/jwt",
      {
      headers: { "Authorization": "Bearer " + token }
      });
      console.log("< 토큰 인증 처리 결과 >");
      console.log(response2.data);
   } catch (error) {
      console.error("로그인 중 오류 발생:", error);
   }
}
