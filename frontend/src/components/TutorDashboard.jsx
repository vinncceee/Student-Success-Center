import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import Modal from './ui/Modal'
import TutorAvailabilityForm from "./TutorAvailabilityForm";
import TutorAvailabilityStatus from "./TutorAvailabilityStatus";
import axios from "axios";

function TutorDashboard({ user }) {
  console.log("User in TutorDashboard: ", user);
  const [availability, setAvailability] = useState(null);
  const [status, setStatus] = useState(null); // 'none' | 'pending' | 'approved'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`/api/tutors/${user.id}/availability`);
        console.log("Hi ", res.data);
        setAvailability(res.data);
        setStatus(res.data.isApproved ? "approved" : "pending");
      } catch (err) {
        setStatus("none");
      }
    };

    fetchAvailability();
  }, [user.id]);

  return (
    <div>
      <HeaderBar />
      <h1>Welcome, {user.name}!</h1>

      {status === "none" && (
        <button onClick={() => setIsModalOpen(true)}>+ Add Availability</button>
      )}

      {status !== "none" && (
        <TutorAvailabilityStatus status={status} availability={availability} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Weekly Availability"
      >
        <TutorAvailabilityForm
          tutorId={user.id}
          onClose={() => {
            setIsModalOpen(false);
            window.location.reload(); // Optional: to refresh status view after submission
          }}
        />
      </Modal>
    </div>
  );
}

export default TutorDashboard;
