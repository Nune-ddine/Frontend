import { Component } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import GotchaPage from './pages/GotchaPage';
import LoginTestPage from './pages/LoginTestPage';
import MakingPage from './pages/MakingPage';
import LocatingPage from './pages/LocatingPage';

class App extends Component {
  
  componentDidMount() { 
    this.setScreenSize();
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

      if (height > root.clientHeight) { 
        height = root.clientHeight;
        width = height * 0.5625; // 16:9
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
      <div id="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/gotcha" element={<GotchaPage />} />
          <Route path='/loginTest' element={<LoginTestPage />} />
          <Route path='/making' element={<MakingPage />} />
          <Route path='/locating' element={<LocatingPage />}/>
        </Routes>
      </div>
    );
  }
}

export default App;
