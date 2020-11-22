import React, { useState, useEffect } from "react";
import { config } from "../config/Config";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import logo from "../assets/images/logo.jpg";

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSignIn = () => {
    let body = {
      email: formData.username,
      password: formData.password,
      rememberMe: true,
    };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(`${config.rootApi}/signIn`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.statusCode == 200) {
          setUser({
            loggedIn: true,
            token: json.token,
          });
        } else if (json.status.statusCode == 400) {
          setError(true);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <div className="login-container">
      <Paper>
        <div className="login-form">
          <img src={logo} className="logo"></img>
          <TextField
            id="username"
            variant="outlined"
            label="Username"
            type="text"
            value={formData.username}
            onChange={(e) => {
              handleChange(e, "username");
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => {
              handleChange(e, "password");
            }}
          />
          {error && <p className="error">Invalid Credentials</p>}
          <Button variant="contained" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </Paper>
    </div>
  );
}
