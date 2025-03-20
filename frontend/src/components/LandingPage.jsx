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
  const userEmail = localStorage.getItem("emailForSignIn");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ Check if user exists in the database
  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/api/user/${userEmail}`)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("role", response.data.role);
          setSubmitted(true);

          // ✅ Redirect users based on role
          if (response.data.role === "Student") navigate("/student-dashboard");
          if (response.data.role === "Tutor") navigate("/tutor-dashboard");
          if (response.data.role === "Admin") navigate("/admin-dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("User not found. Allowing registration.");
          localStorage.removeItem("infoSubmitted");
          localStorage.removeItem("role");
          setSubmitted(false);
        }
      })
      .finally(() => setLoading(false));
  }, [userEmail, navigate, API_URL]);

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        idNumber, // ✅ Added ID Number
        gradeLevel,
        role,
      });

      localStorage.setItem("infoSubmitted", "true");
      localStorage.setItem("role", role);
      setSubmitted(true);
      setMessage(response.data.message);

      // ✅ Redirect after submission
      if (role === "Student") navigate("/student-dashboard");
      if (role === "Tutor") navigate("/tutor-dashboard");
      if (role === "Admin") navigate("/admin-dashboard");
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
