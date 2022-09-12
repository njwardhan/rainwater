import './App.css';
import background from './background.jpg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className='body'>
        <Navbar />
        <h1 className='App-name'>RainWater</h1>
        <h2 className='App-description'>A fully decentralized social media protocol, backed by IPFS and smart contracts.</h2>
      </div>
    </BrowserRouter>
  );
}

export default App;


