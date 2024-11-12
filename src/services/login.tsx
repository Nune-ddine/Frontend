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

// 백에 토큰 전송 -> @@근데 이거 왜있지?
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

// 두 함수 한 번에: 최종 로그인 -> 이거 쓸 것 같다
export const login = async (code: string) => {
   console.log("< 로그인 시작 >");
 
   try {
     // 카카오 인증 처리 요청
     const { data } = await axios.post("https://nuneddine.p-e.kr/api/v1/oauth/kakao/token", {
       authorization_code: code,
     });
     
     console.log("< 카카오 인증 처리 결과 >", data);
 
     const token = data.token;
 
     if (token) {
       // 토큰이 있는 경우에만 localStorage에 저장
       localStorage.setItem("token", token);
       console.log("토큰이 성공적으로 저장되었습니다.");
 
       // 저장한 토큰으로 인증 요청
       const authResponse = await axios.get("https://nuneddine.p-e.kr/api/v1/cors/jwt", {
         headers: { Authorization: `Bearer ${token}` },
       });
 
       console.log("< 토큰 인증 처리 결과 >", authResponse.data);
     } else {
       // 토큰이 없을 경우 처리
       console.warn("토큰이 발급되지 않았습니다. 인증을 확인해 주세요.");
     }
   } catch (error) {
     console.error("로그인 중 오류 발생:", error);
   }
 };
 