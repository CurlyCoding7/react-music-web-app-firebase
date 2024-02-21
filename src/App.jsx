import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Audio from "./components/Audio";
import Upload from "./components/Upload";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import FreeAudio from "./components/FreeAudio";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audios" element={<Audio />} />
        <Route path="/free-audios" element={<FreeAudio />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
