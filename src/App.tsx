import { Component } from 'react';
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

class App extends Component {
  
  componentDidMount() {
    // 가로가 세로보다 긴 경우에만 실행
    if (window.innerWidth > window.innerHeight) {
      console.log("가로가 세로보다 긴 화면입니다.");
      this.fixRatio();
      window.addEventListener('resize', this.fixRatio);
    }
  }

  componentWillUnmount() {
    // 가로가 세로보다 긴 경우에만 이벤트 제거
    if (window.innerWidth > window.innerHeight) {
      window.removeEventListener('resize', this.fixRatio);
    }
  }

  fixRatio = () => {
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

  setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  render() {
    return (
      <RecoilRoot>
      <HeaderProvider>
        <div id="App">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/gotcha" element={<GotchaPage />} />
          <Route path='/login' element={<LoginTestPage />} />
          <Route path='/making' element={<MakingPage />} />
          <Route path='/snowmanResult' element={<SnowmanResultPage />} />
          <Route path='/locating/:id' element={<LocatingPage />}/>
          <Route path='/elevator' element={<SelectingMapPage/>}/>
          <Route path='/elevator2' element={<SelectingMapPage2/>}/>
          <Route path="/quiz" element={<QuizTestPage/>}/>
          <Route path="/onboarding/:id" element={<OnboardingPage/>}/>
          </Routes>
        </div>
        </HeaderProvider>
      </RecoilRoot>
    );
  }
}

export default App;