import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "./HeaderBar";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState(""); // ✅ Added ID Number
  const [gradeLevel, setGradeLevel] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ Check if user exists in the database or stored session
  useEffect(() => {
    const storedEmail = localStorage.getItem("verifiedUser"); // ✅ Keep email after logout
    const userEmail = localStorage.getItem("emailForSignIn") || storedEmail;

    if (!userEmail) {
        setLoading(false);
        return;
    }

    // Check if role is already in localStorage (returning user)
    const storedRole = localStorage.getItem("role");
    const infoSubmitted = localStorage.getItem("infoSubmitted");

    if (storedRole && infoSubmitted === "true") {
        console.log("✅ User already logged in, redirecting...");
        navigate(getDashboardPath(storedRole));
        return;
    }

    // If role is not found in localStorage, fetch from database
    axios
      .get(`${API_URL}/api/user/${userEmail}`)
      .then((response) => {
          if (response.data) {
              localStorage.setItem("role", response.data.role);
              localStorage.setItem("infoSubmitted", "true");
              localStorage.setItem("emailForSignIn", userEmail); // ✅ Keep email stored
              navigate(getDashboardPath(response.data.role));
          }
      })
      .catch((err) => {
          if (err.response && err.response.status === 404) {
              console.log("❌ User not found. Allowing registration.");
              localStorage.removeItem("infoSubmitted");
              localStorage.removeItem("role");
          }
      })
      .finally(() => setLoading(false));
  }, [navigate, API_URL]); // ✅ Corrected dependency array


  // ✅ Function to get the correct dashboard path
  const getDashboardPath = (role) => {
    switch (role) {
      case "Student":
        return "/student-dashboard";
      case "Tutor":
        return "/tutor-dashboard";
      case "Admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("emailForSignIn");

    if (!userEmail) {
        setMessage("❌ Error: User email not found. Please sign in first.");
        return;
    }

    if (!idNumber.trim()) {
        setMessage("❌ Error: ID Number is required.");
        return;
    }

    try {
        const response = await axios.post(`${API_URL}/api/save-info`, {
            email: userEmail,
            name,
            idNumber,
            gradeLevel,
            role,
        });

        // ✅ Store user details permanently
        localStorage.setItem("infoSubmitted", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("verifiedUser", userEmail); // ✅ Preserve email across logins
        setSubmitted(true);
        setMessage(response.data.message);

        navigate(getDashboardPath(role));
    } catch (err) {
        setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="landing-page">
      <HeaderBar />
      <div className="content">
        {!submitted ? (
          <form className="landing-form" onSubmit={handleSubmit}>
            <h1>Info for Database Testing</h1>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="idNumber">ID Number</label> {/* ✅ Added ID Number */}
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />

            <label htmlFor="gradeLevel">Grade Level</label>
            <select
              id="gradeLevel"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              required
            >
              <option value="" disabled hidden>Select grade level</option>
              <option value="freshman">Undergrad - Freshman</option>
              <option value="sophomore">Undergrad - Sophomore</option>
              <option value="junior">Undergrad - Junior</option>
              <option value="senior">Undergrad - Senior</option>
              <option value="masters">Masters</option>
              <option value="phd">PhD</option>
            </select>

            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select role</option>
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
              <option value="Admin">Admin</option> {/* ✅ Added Admin Role */}
            </select>

            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>✅ Redirecting you to your dashboard...</p>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default LandingPage;
