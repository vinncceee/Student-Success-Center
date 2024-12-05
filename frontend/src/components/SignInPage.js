import React from 'react';
import '../styles/SignInPage.css';

function SignInPage() {
  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
        
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />
        
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
