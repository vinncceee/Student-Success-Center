import React, { useState } from "react";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/SignInPage.css";
import { auth } from "../firebase"; // Import Firebase authentication instance

function SignInPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Firebase Action Code Settings
  const actionCodeSettings = {
    url: "http://localhost:3000/landing", // Change this to your actual redirect URL
    handleCodeInApp: true,
  };

  const handleSendSignInLink = async (e) => {
    e.preventDefault();

    // Restrict sign-in to only `@mavs.uta.edu` emails
    if (!email.endsWith("@mavs.uta.edu")) {
      setMessage("Only @mavs.uta.edu email addresses are allowed.");
      return;
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email); // Store email for later use
      setMessage("Sign-in link sent! Check your email.");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const handleCompleteSignIn = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        email = prompt("Please enter your email to confirm:");
      }

      if (!email.endsWith("@mavs.uta.edu")) {
        setMessage("Unauthorized email. Only @mavs.uta.edu emails are allowed.");
        return;
      }

      try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        setMessage("Sign-in successful! Redirecting...");
        window.localStorage.removeItem("emailForSignIn"); // Cleanup
        setTimeout(() => navigate("/landing"), 2000);
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div className="signin-container">
      <h1>Welcome to UTA Student Success Center</h1>
      <form className="signin-form" onSubmit={handleSendSignInLink}>
        <label htmlFor="email">UTA Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your @mavs.uta.edu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Sign-In Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignInPage;
