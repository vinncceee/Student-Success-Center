import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import LandingPage from "./components/LandingPage";
import RoleTestPage from "./components/RoleTestPage";
import StudentDashboard from "./components/StudentDashboard";
import TutorDashboard from "./components/TutorDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  // Retrieve the role from localStorage
  const userRole = localStorage.getItem("role");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/role-test" element={<RoleTestPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/student-dashboard"
        element={userRole === "Student" ? <StudentDashboard /> : <Navigate to="/signin" />}
      />
      <Route
        path="/tutor-dashboard"
        element={userRole === "Tutor" ? <TutorDashboard /> : <Navigate to="/signin" />}
      />
        <Route
        path="/admin-dashboard"
        element={userRole === "Admin" ? <AdminDashboard /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

export default App;
