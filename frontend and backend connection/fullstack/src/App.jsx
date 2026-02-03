import React, { useState } from "react";
import "./App.css";

import axios from "axios";

const App = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");

  

  /* const [Form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    confirm: "",
  }); */

  const handlesubmit = async () => {
    alert("cliekd submit");

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      pass.trim() === "" ||
      confirmpass.trim() === ""
    ) {
      alert("Invalid Input");
      return;
    }
    if (pass !== confirmpass) {
      alert("Password mismatch");
      return;
    }

    // Send Request to backend

    const res = await axios.post("http://localhost:5000/register", {
      fullname: name,
      email: email,
      password: pass,
    });

    const status = res.data.status;

    if (status == true) {
      console.log(res.data);
    } else {
      alert("Error");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          value={name}
          placeholder="Full Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
          required
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="Email Address"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setpass(e.target.value);
          }}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={confirmpass}
          onChange={(e) => {
            setconfirmpass(e.target.value);
          }}
          placeholder="Confirm Password"
          required
        />

        <button type="button" onClick={handlesubmit}>
          Register
        </button>

        <p className="login-text">
          Already have an account? <span>Login</span>
        </p>
      </form>
    </div>
  );
};

export default App;
