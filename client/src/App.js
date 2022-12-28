import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import SIPCalculator from "./components/SIP/SIPCalculator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/calculator" element={<SIPCalculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
