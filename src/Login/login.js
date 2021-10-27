import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginCSS from "./login.module.css";

const admin = {
  username: "admin",
  password: "admin123",
};

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  function setfromdatatostorage(e) {
    e.preventDefault();
    console.log(username, password);

    // chacking if admin has loged in!!!

    if (username === admin.username && password === admin.password) {
      alert("Successfully Loged In as Admin!!");
      window.open("/admin", "_self");
      return;
    }
    let users = localStorage.getItem("user_data");
    // users = users ? JSON.parse(users) : {};
    if (users) users = JSON.parse(users);
    else users = {};

    console.log(users);

    // checking that username exists or not

    if (users[username]) {
      if (
        username === users[username].username &&
        password === users[username].password
      ) {
        alert("Succesfully Login");
        localStorage.setItem("loged_in_user", JSON.stringify(username));
        window.open("/customer", "_self");
      } else alert("either password or username is wrong");
    } else alert("User Not Found");
  }

  return (
    <div className={LoginCSS.container}>
      <h1 className={LoginCSS.heading}>Login</h1>
      <form onSubmit={setfromdatatostorage}>
        <input
          required
          className={LoginCSS.input1}
          placeholder="Enter Your User Name"
          onChange={(e) => setusername(e.target.value)}
        />
        <br />
        <br />
        <input
          required
          className={LoginCSS.input1}
          placeholder="Enter Your Password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />
        <br />
        <div className="text-center">
          <button className={LoginCSS.btn}> Login</button>
        </div>
      </form>
      <br />
      <br />
      <div className="text-center">
        <Link to="/signup">Dont' have an account?</Link>
      </div>
    </div>
  );
}

export default Login;
