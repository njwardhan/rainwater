import './App.css';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import App_Navbar from "./components/App_Navbar";
import Home from './pages';
import Community from './pages/community';
import Contact from './pages/contact';
import Ecosystem from './pages/ecosystem';
import Faq from './pages/faq';
import App_Launch from './pages/launch-app';

function App() {
  return (
    <BrowserRouter>
      <div className="Navibar">
        {window.location.pathname != "/launch-app" && <Navbar />}
        {window.location.pathname == "/launch-app" && <App_Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/community" element={<Community />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/launch-app" element={<App_Launch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


