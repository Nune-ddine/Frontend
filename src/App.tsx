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

class App extends Component {
  
  componentDidMount() { 
    // this.setScreenSize();
    this.fixRatio();
    window.addEventListener('resize', this.fixRatio);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fixRatio);
  }

  fixRatio = () => {
    const root = document.querySelector("#root");
    const app = document.querySelector("#App") as HTMLElement;;

    if (root && app) {
      let width = root.clientWidth;
      let height = width * 1.7777; // 9:16
      // let height = width * 2.164102; // 9:16
      // 844 / 390 = 2.164102

      if (height > root.clientHeight) { 
        height = root.clientHeight;
        width = height * 0.5625; // 16:9
        // width = height * 0.462086; // 16:9
        // 390 / 844 = 0.462086
      }

      app.style.width = `${width}px`;
      app.style.height = `${height}px`;
    }
  }

  setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  render() {
    return (
      <RecoilRoot>
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
      </RecoilRoot>
    );
  }
}

export default App;
