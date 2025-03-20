import React, { useState } from "react";
import BookingSessionModal from "../components/BookingSessionModal";
// import Button from "../components/ui/Button";

const StudentDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h1>Student Dashboard</h1>
            <button onClick={() => setIsModalOpen(true)}>Book a Session</button>

             {/* Booking Modal (Opens when button is clicked) */}
      <BookingSessionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default StudentDashboard;