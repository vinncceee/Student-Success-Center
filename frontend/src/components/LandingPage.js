    import React, { useState } from "react";
    import axios from "axios"; // Import Axios for API requests
    import "../styles/LandingPage.css";

    function LandingPage() {
    const [name, setName] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    // Check if the user has already submitted information
    const [submitted, setSubmitted] = useState(localStorage.getItem('infoSubmitted') === 'true');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await axios.post("http://localhost:5000/api/save-info", {
            name,
            gradeLevel,
            role,
        });
        localStorage.setItem('infoSubmitted', 'true');
        setSubmitted(true); // Hide the form and show the success message
        setMessage("Your information has been submitted successfully!");
        } catch (err) {
        setMessage(`Error submitting information: ${err.response?.data?.message || err.message}`);
        }
    };
    
    

    return (
        <div className="landing-page">
          {!submitted ? (
            <>
              <h1>Info for database testing</h1>
              <form className="landing-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="" disabled>Select role</option>
                  <option value="Student">Student</option>
                  <option value="Tutor">Tutor</option>
                </select>
    
                <button type="submit">Submit</button>
              </form>
            </>
          ) : (
            <div className="info-success">
              <h2>Information Submitted</h2>
              <p>{message}</p>
            </div>
          )}
        </div>
      );
    }
    
    export default LandingPage;
