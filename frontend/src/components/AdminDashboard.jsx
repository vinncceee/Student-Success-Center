import React from "react";
import HeaderBar from "./HeaderBar";
import AuthRequest from "./AuthRequest"
import UnassignedRoles from "./UnassignedRoles"
import ProfileSearch from "./ProfileSearch";

const AdminDashboard = () => {
  return (
    
    <div>
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
