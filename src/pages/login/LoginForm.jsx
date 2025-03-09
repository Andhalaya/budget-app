import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true); 
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
      navigate("/");   
    } else {
      await register(email, password);
      setSuccessMessage("Account created. Please login.");
      setTimeout(() => {
        setIsLogin(true);
      }, 2000); 
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setSuccessMessage(""); 
  };

  return (
    <div className="login-box">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="column">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="column">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p>
        {isLogin ? (
          <>
            Don't have an account? <button onClick={toggleMode}>Register</button>
          </>
        ) : (
          <>
            Already have an account? <button onClick={toggleMode}>Login</button>
          </>
        )}
      </p>
    </div>
  );
}
