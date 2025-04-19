import React, { useState } from "react";
import HeaderBar from "./HeaderBar";
import Modal from "./ui/Modal";
import TutorAvailabilityForm from "./TutorAvailabilityForm";
import TutorCurrentAvailability from "./TutorCurrentAvailability";
import Profile from "./Profile";
import axios from "axios";

function TutorDashboard({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityKey, setAvailabilityKey] = useState(0); // Used to re-render after update
  const userEmail = localStorage.getItem("emailForSignIn"); // Get tutor's email

  const handleNewRequest = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <HeaderBar />
      {userEmail && <Profile email={userEmail} />}
      
      <TutorCurrentAvailability
        tutorId={user.id}
        onRequestNew={handleNewRequest}
        key={availabilityKey}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Weekly Availability"
      >
        <TutorAvailabilityForm
          tutorId={user.id}
          onClose={() => {
            setIsModalOpen(false);
            setAvailabilityKey((prev) => prev + 1); // refresh availability
          }}
        />
      </Modal>
    </div>
  );
}

export default TutorDashboard;
