import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
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
    <HashRouter>
      <div className="Navibar">
        <Routes>
          <Route path="/" element={<><Home /><Navbar /></>} />
          <Route path="/ecosystem" element={<><Ecosystem /><Navbar /></>} />
          <Route path="/community" element={<><Community /><Navbar /></>} />
          <Route path="/faq" element={<><Faq /><Navbar /></>} />
          <Route path="/contact" element={<><Contact /><Navbar /></>} />
          <Route path="/launch-app" element={<><App_Navbar /><App_Launch /></>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;


