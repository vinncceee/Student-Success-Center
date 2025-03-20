import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UTAlogo from "../assets/images/UTA.png";
import "../styles/HeaderBar.css";

function HeaderBar() {
    const navigate = useNavigate();
    const [storedId, setStoredId] = useState(""); // ID from database
    const [enteredId, setEnteredId] = useState(""); // User input
    const [error, setError] = useState(""); // Error message
    const [showModal, setShowModal] = useState(false); // Controls modal visibility
    const [signoutSuccess, setSignoutSuccess] = useState(false); // Sign-out success message
    const userEmail = localStorage.getItem("emailForSignIn");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    // Fetch user ID from database when component loads
    useEffect(() => {
        if (userEmail) {
            axios.get(`${API_URL}/api/user/${userEmail}`)
                .then((response) => {
                    if (response.data && response.data.idNumber) {
                        setStoredId(response.data.idNumber); // Store ID
                    }
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [userEmail, API_URL]);

    const handleSignOutClick = () => {
        setShowModal(true); // Show sign-out modal
        setEnteredId(""); // Reset input field
        setError(""); // Clear previous errors
    };

    const handleSignOut = () => {
        if (enteredId !== storedId) {
            setError("ID did not match. Please try again.");
            return;
        }
    
        // ✅ Keep email stored but remove other session data
        const userEmail = localStorage.getItem("emailForSignIn");
        localStorage.clear();  // Clear all session data
        if (userEmail) {
            localStorage.setItem("verifiedUser", userEmail); // ✅ Store verified email for re-login
        }
    
        setShowModal(false); // Hide modal
        setSignoutSuccess(true); // Show success message
    
        // Redirect to sign-in page after 2 seconds
        setTimeout(() => {
            setSignoutSuccess(false);
            navigate("/signin");
        }, 2000);
    };
    
    

    return (
        <div className="header-bar">
            <img src={UTAlogo} alt="UTA Logo" className="header-logo" />
            <h1>STUDENT SUCCESS CENTER</h1>
            <button className="sign-out-btn" onClick={handleSignOutClick}>Sign Out</button>

            {/* Sign-Out Modal */}
            {showModal && (
                <div className="signout-modal">
                    <div className="signout-box">
                        <h2>Confirm Sign Out</h2>
                        <p>Enter your ID number to sign out:</p>
                        <input
                            type="text"
                            className="id-input"
                            value={enteredId}
                            onChange={(e) => setEnteredId(e.target.value)}
                        />
                        {error && <p className="error-text">{error}</p>}
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleSignOut}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {signoutSuccess && (
                <div className="signout-success">
                    <p>✅ Sign-out successful! Redirecting...</p>
                </div>
            )}
        </div>
    );
}

export default HeaderBar;
