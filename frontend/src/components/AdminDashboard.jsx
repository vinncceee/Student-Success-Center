import React from "react";
import HeaderBar from "./HeaderBar";
import AuthRequest from "./AuthRequest"
import UnassignedRoles from "./UnassignedRoles"
import ProfileSearch from "./ProfileSearch";
import AvailabilityRequests from "./AvailabilityRequests";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div>
      <HeaderBar />
      <main className="leftPanel">
        <ProfileSearch />
        <AvailabilityRequests />
      </main>
      <main className="rightPanel">
        <AuthRequest />
        <UnassignedRoles />
      </main>
    </div>
  );
};

export default AdminDashboard;
