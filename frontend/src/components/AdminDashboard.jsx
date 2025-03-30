import React from "react";
import HeaderBar from "./HeaderBar";
import AuthRequest from "./AuthRequest"
import UnassignedRoles from "./UnassignedRoles"

const AdminDashboard = () => {
  return (
    
    <div>
      <HeaderBar />
      <main className="rightPanel">
        <AuthRequest />
        <UnassignedRoles />
      </main>
    </div>
  );
};

export default AdminDashboard;
