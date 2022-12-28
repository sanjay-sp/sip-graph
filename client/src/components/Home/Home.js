import React, { useState } from "react";
import "./Home.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Home = () => {
  const [active, setActive] = useState("login");

  const setActiveHandler = (val, event) => {
    if (active !== val) {
      setActive(val);
    }
  };

  return (
    <div className="home">
      <div className="home-buttons">
        <div
          className={`home-button ${active == "login" ? "active" : ""}`}
          onClick={() => setActiveHandler("login")}
        >
          Login
        </div>
        <div
          className={`home-button ${active == "register" ? "active" : ""}`}
          onClick={() => setActiveHandler("register")}
        >
          Register
        </div>
      </div>
      {active == "login" ? <Login /> : <Register />}
    </div>
  );
};

export default Home;
