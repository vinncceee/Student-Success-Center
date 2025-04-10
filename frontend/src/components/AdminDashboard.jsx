import React from "react";
import HeaderBar from "./HeaderBar";
import AuthRequest from "./AuthRequest";
import UnassignedRoles from "./UnassignedRoles";
import ProfileSearch from "./ProfileSearch";
import Profile from "./Profile"; // Add this import

const AdminDashboard = () => {
  const userEmail = localStorage.getItem("emailForSignIn"); // Get admin's email

  return (
    <div className="admin-dashboard">
      {/* Add Profile component at top-left */}
      <Profile email={userEmail} />
      
      <HeaderBar />
      <main className="leftPanel">
        <ProfileSearch />
      </main>
      <main className="rightPanel">
        <AuthRequest />
        <UnassignedRoles />
      </main>
    </div>
  );
};

export default AdminDashboard;