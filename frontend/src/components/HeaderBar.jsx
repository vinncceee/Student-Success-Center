import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UTAlogo from "../assets/images/UTA.png";
import "../styles/HeaderBar.css";

function HeaderBar() {
    const navigate = useNavigate();
    const [storedId, setStoredId] = useState(""); // ID from database
    const [error, setError] = useState(""); // Error message
    const [showModal, setShowModal] = useState(false); // Controls modal visibility
    const [signoutSuccess, setSignoutSuccess] = useState(false); // Sign-out success message
    const [swipeMode, setSwipeMode] = useState(true); // Toggle between swipe/manual
    const [manualId, setManualId] = useState(""); // Manually entered ID
    const userEmail = localStorage.getItem("emailForSignIn");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    // ✅ Fetch user ID from the database when component loads
    useEffect(() => {
        if (userEmail) {
            axios.get(`${API_URL}/api/user/${userEmail}`)
                .then((response) => {
                    if (response.data && response.data.idNumber) {
                        setStoredId(response.data.idNumber.trim()); // ✅ Ensure no extra spaces
                        console.log("✅ Stored ID from Database:", response.data.idNumber); // ✅ Debugging
                    } else {
                        console.error("❌ ID not found in database for", userEmail);
                    }
                })
                .catch((err) => console.error("❌ Error fetching user data:", err));
        }
    }, [userEmail, API_URL]);
    

    // ✅ Capture Card Swipe Data (Simulated as Keyboard Input)
    useEffect(() => {
        if (!swipeMode) return; // Only listen when swipe mode is active

        let buffer = "";
        let scanning = false;

        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                scanning = false;
                processSwipedData(buffer);
                buffer = "";
            } else {
                buffer += event.key; // Append scanned characters
                scanning = true;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [swipeMode]); // Only re-attach listener when swipe mode changes

    // ✅ Process the Swiped Card Data
    const processSwipedData = (data) => {
        console.log("Raw Swiped Data:", data); // ✅ Debugging: Log full swipe data
    
        // ✅ Remove all occurrences of "Shift"
        const cleanedData = data.replace(/Shift/g, "");
    
        // ✅ Extract the correct student ID (last numeric sequence after "+")
        const match = cleanedData.match(/\+(\d+)\?/); // Extracts digits after "+"
        const extractedId = match ? match[1] : null;
    
        if (!extractedId) {
            setError("❌ Failed to extract ID. Please swipe again.");
            return;
        }
    
        console.log("Cleaned Swipe Data:", cleanedData); // ✅ Debugging
        console.log("Extracted ID:", extractedId); // ✅ Should now be `1001702150`
    
        handleSignOut(extractedId);
    };
    
    

    const handleSignOutClick = () => {
        setShowModal(true); // Show sign-out modal
        setError(""); // Clear previous errors
    };

    // ✅ Handle Sign-Out
    const handleSignOut = (scannedId) => {
        console.log("Stored ID in State:", storedId); // ✅ Debugging
        console.log("Scanned ID:", scannedId); // ✅ Debugging

        if (!scannedId || scannedId.trim() === "") {
            setError("❌ No ID detected. Please try again.");
            return;
        }

        if (!storedId) {
            setError("❌ No stored ID found. Ensure your account has an ID in the database.");
            return;
        }

        if (scannedId !== storedId) {
            setError(`❌ ID did not match. Expected: ${storedId}, Got: ${scannedId}`);
            return;
        }

        // ✅ Preserve email and role to prevent re-authentication
        const userEmail = localStorage.getItem("emailForSignIn");
        const userRole = localStorage.getItem("role");

        localStorage.clear(); // Clear session data
        if (userEmail) {
            localStorage.setItem("verifiedUser", userEmail); // ✅ Keep verified email
        }
        if (userRole) {
            localStorage.setItem("role", userRole); // ✅ Keep user role
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
                        <h2>Sign Out</h2>
                        <p>Select a sign-out method:</p>

                        {/* Toggle between Swipe and Manual Entry */}
                        <div className="signout-options">
                            <button
                                className={swipeMode ? "active" : ""}
                                onClick={() => setSwipeMode(true)}
                            >
                                Swipe ID
                            </button>
                            <button
                                className={!swipeMode ? "active" : ""}
                                onClick={() => setSwipeMode(false)}
                            >
                                Enter ID Manually
                            </button>
                        </div>

                        {swipeMode ? (
                            <p>Swipe your ID card using the scanner.</p>
                        ) : (
                            <>
                                <label htmlFor="manual-id">Enter ID:</label>
                                <input
                                    type="text"
                                    id="manual-id"
                                    className="id-input"
                                    value={manualId}
                                    onChange={(e) => setManualId(e.target.value)}
                                />
                                <button onClick={() => handleSignOut(manualId)}>Confirm</button>
                            </>
                        )}

                        {error && <p className="error-text">{error}</p>}
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
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
