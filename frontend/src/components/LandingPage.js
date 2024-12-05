import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication state if necessary
    // Redirect to the sign-in page
    navigate("/signin");
  };

  return (
    <div className="landing-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the UTA STUDENT SUCCESS CENTER!</h1>
      <p>You have successfully signed in.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Log Out
      </button>
    </div>
  );
}

export default LandingPage;
