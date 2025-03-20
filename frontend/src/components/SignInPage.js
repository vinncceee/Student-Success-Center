//SigInPage.js

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/SignInPage.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setMessage("Sign-in successful! Redirecting...");
      // Redirect to the appointments page after successful sign-in
      setTimeout(() => navigate("/appointments"), 2000);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup"); // Redirect to the SignUp page
  };

  return (
    <div className="signin-container">
      <h1>Welcome to UTA Student Success Center</h1>
      <form className="signin-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
      {/* New User Redirect */}
      <div className="new-user">
        <p>New user?</p>
        <button onClick={handleSignUpRedirect}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignInPage;
