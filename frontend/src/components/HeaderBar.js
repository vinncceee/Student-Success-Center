import React from "react";
import { useNavigate } from "react-router-dom";
import UTAlogo from "../assets/images/UTA.png";
import "../styles/HeaderBar.css";

function HeaderBar() {
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        navigate("/signin"); // Redirect to the SignInPage
    };
    
    return (
      <div className="header-bar">
        <img src={UTAlogo} alt="UTA Logo" className="header-logo" />
        <h1>STUDENT SUCCESS CENTER</h1>
        <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
      </div>
    );
}
export default HeaderBar;