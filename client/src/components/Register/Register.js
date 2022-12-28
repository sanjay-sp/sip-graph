import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.message == "created user") {
      Swal.fire({
        title: "Registered",
        text: "User successfully registered",
        icon: "success",
      }).then(() => window.location.reload());
    } else if (data.message == "user exists") {
      Swal.fire({
        icon: "error",
        title: "Already Exists!",
        text: "Email ID has been already registered.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <form className="register-form" onSubmit={registerUser}>
        <input
          className="form-name"
          value={name}
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-email"
          value={email}
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-password"
          value={password}
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="form-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
