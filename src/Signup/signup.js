import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupCSS from "./signup.module.css";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  function setdatatolocalstorage(e) {
    e.preventDefault();
    let users = localStorage.getItem("user_data");
    users = users ? JSON.parse(users) : {};

    if (users[username]) {
      alert("Username Alredy Taken!!!");
      return;
    } else alert("Succussefully Created Go To Login Page");

    users[username] = {
      username,
      password,
    };

    localStorage.setItem("user_data", JSON.stringify(users));
  }

  return (
    <div className={SignupCSS.container}>
      <h1 className={SignupCSS.heading}>SignUp</h1>
      <form onSubmit={setdatatolocalstorage}>
        <input
          onChange={(e) => {
            setusername(e.target.value);
          }}
          required
          className={SignupCSS.input1}
          placeholder="Enter Your User Name"
        />
        <br />
        <br />
        <input
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          required
          className={SignupCSS.input1}
          placeholder="Enter Your Password"
        />
        <br />
        <br />
        <div className="text-center">
          <button className={SignupCSS.btn}>signup</button>
        </div>
      </form>
      <br />
      <br />
      <div className="text-center">
        <Link to="/login">Already' have an account?</Link>
      </div>
    </div>
  );
}

export default Signup;
