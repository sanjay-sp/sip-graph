import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/calculator";
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid",
        text: "Invalid email or password",
      });
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={loginUser}>
        <input
          className="form-email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="form-button" type="submit">
          Login
        </button>
      </form>
      <div className="guest">
        Guest login - Email: guest@a.com Password: guest
      </div>
    </div>
  );
}

export default Login;
