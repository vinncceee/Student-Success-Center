import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import '../styles/SignUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    try {
      // Create user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("User registered successfully! Redirecting to Sign In...");
      
      // Redirect to Sign In page after 2 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignUpPage;
