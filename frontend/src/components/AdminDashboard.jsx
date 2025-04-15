import React from "react";
import HeaderBar from "./HeaderBar";
import AuthRequest from "./AuthRequest"
import UnassignedRoles from "./UnassignedRoles"
import ProfileSearch from "./ProfileSearch";
import AvailabilityRequests from "./AvailabilityRequests";
import Calendar from "./Calendar";
import "../styles/AdminDashboard.css"; //leftPanel is in InfoPanel

const AdminDashboard = () => {
  return (
    <div>
      <HeaderBar />
      <main className="leftPanel">
        <ProfileSearch />
        <AvailabilityRequests />
        {/*<Calendar />*/}
      </main>
      <main className="rightPanel">
        <AuthRequest />
        <UnassignedRoles />
      </main>
    </div>
  );
};

export default AdminDashboard;
