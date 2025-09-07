import React, { useState } from "react";
import "./styles/LoginPage.css";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", credentials: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { username: "", password: "", credentials: "" };

   
    if (!username.trim()) {
      newErrors.username = "Username is required";
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    
    if (username === "admin" && password === "admin@123") {
      onLogin({ role: "admin" });
    } else if (username === "user1" && password === "user@123") {
      onLogin({ role: "user" });
    } else {
      newErrors.credentials = "Invalid credentials";
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
    <h1 className="login-title">MUSIC APP LOGIN</h1>
  <div className="login-box">
    <form onSubmit={handleSubmit} className="login-form">
      <label className="form-label">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`form-input ${errors.username ? "input-error" : ""}`}
        />
        {errors.username && <span className="error-text">{errors.username}</span>}
      </label>

      <label className="form-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`form-input ${errors.password ? "input-error" : ""}`}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </label>

      {errors.credentials && <span className="error-text">{errors.credentials}</span>}

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  </div>
</div>
  );
}
