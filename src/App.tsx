import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import LoginTestPage from './pages/LoginTestPage';
import SnowmanResultPage from './pages/SnowmanResultPage';
import LocatingPage from './pages/LocatingPage';
import SelectingMapPage from './pages/SelectingMapPage';
import GotchaPage from './pages/GotchaPage';
import MakingPage from './pages/makingPage';
import QuizTestPage from './pages/QuizTestPage';
import { RecoilRoot } from 'recoil';
import SelectingMapPage2 from './pages/SelectingMapPage-locating';
import OnboardingPage from './pages/OnboardingPage';
import { HeaderProvider } from './contexts/HeaderContext';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fixRatio = () => {
      const root = document.querySelector("#root");
      const app = document.querySelector("#App") as HTMLElement;

      if (root && app) {
        let width = root.clientWidth;
        let height = width * 1.7777; // 9:16 비율

        if (height > root.clientHeight) {
          height = root.clientHeight;
          width = height * 0.5625; // 16:9 비율
        }

        app.style.width = `${width}px`;
        app.style.height = `${height}px`;
      }
    };

    const handleResize = () => {
      if (window.innerWidth > window.innerHeight) {
        fixRatio();
      }
    };

    // 초기 설정
    if (window.innerWidth > window.innerHeight) {
      console.log("가로가 세로보다 긴 화면입니다.");
      fixRatio();
    }

    // 이벤트 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Check for token in localStorage to determine authentication
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Token exists → true, otherwise false

    // 로딩 완료
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 토큰 확인 후 1초 지연 (옵션)
  }, []);

  if (isLoading) {
    return (
      <RecoilRoot>
        <HeaderProvider>
          <div id="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<HomePage />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/gotcha" element={<GotchaPage />} />
              <Route path='/login/:id' element={<LoginTestPage />} />
              <Route path='/making' element={<MakingPage />} />
              <Route path='/snowmanResult' element={<SnowmanResultPage />} />
              <Route path='/locating/:id' element={<LocatingPage />} />
              <Route path='/elevator' element={<SelectingMapPage/>}/>
              <Route path='/elevator2' element={<SelectingMapPage2/>}/>
              <Route path="/quiz" element={<QuizTestPage/>}/>
              <Route path="/onboarding/:id" element={<OnboardingPage/>}/>
            </Routes>
          </div>
        </HeaderProvider>
      </RecoilRoot>
      <div id="App" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#666',
        backgroundImage: `url('/images/onboarding/0.png')`, // URL 형식으로 설정
        backgroundSize: 'cover', // 이미지 크기 조정 (옵션)
        backgroundRepeat: 'no-repeat', // 이미지 반복 방지 (옵션)
        backgroundPosition: 'center', // 이미지 위치 조정 (옵션)
      }}>
      </div>
    );
  }

  return (
    <RecoilRoot>
      <div id="App">
        <Routes>

              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<HomePage />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/gotcha" element={<GotchaPage />} />
              <Route path="/making" element={<MakingPage />} />
              <Route path="/snowmanResult" element={<SnowmanResultPage />} />
              <Route path="/locating/:id" element={<LocatingPage />} />
              <Route path="/elevator" element={<SelectingMapPage />} />
              <Route path="/elevator2" element={<SelectingMapPage2 />} />
              <Route path="/quiz" element={<QuizTestPage />} />
              <Route path="/onboarding/:id" element={<OnboardingPage />} />

        </Routes>
      </div>
    </RecoilRoot>
  );
};

export default App;
