import './App.css'
import { useEffect } from 'react'
import KakaoLoginBtn from './services/KakaoLoginBtn'
import { sendKakaoCode } from './services/login'
import apiTest from './services/apiTest';

function App() {
  useEffect(() => {
    //url에서 인가코드 받아오기
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    console.log(code);
    //인가코드가 있으면 백엔드에 보내기
    if (code) {
        sendKakaoCode(code);

    }
    else{
        console.log("인가코드 없음");
    }
    
}
, []);

  return (
    <>
      <button onClick={apiTest}>API TEST</button>
      <KakaoLoginBtn />
    </>
  )
}

export default App
