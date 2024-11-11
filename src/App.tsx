import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';

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
        <HomePage />
      </div>
    );
  }
}

export default App;
