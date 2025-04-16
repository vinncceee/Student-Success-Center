import React, { useState, useEffect } from "react";
import "../styles/ProfileSearch.css";

function ProfileSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal-related states
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 1) Fetch ALL users once on mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        // Replace with your real endpoint
        const response = await fetch("http://localhost:5000/api/users");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPeople(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // 2) Filter the users in the front end

  // 2A) Filter by name: only show names that START WITH `searchTerm` (case-insensitive).
  let filteredPeople = people.filter((person) =>
    person.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // 2B) Filter by role if not 'all'
  filteredPeople = filteredPeople.filter((person) => {
    if (roleFilter === "all") return true;
    return person.role?.toLowerCase() === roleFilter;
  });

  // Handler when a user in the list is clicked
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true); // open the modal
  };

  // Handler to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <main className="outerPanel">
      <main className="innerPanel">
        <h3 className="profileSearchHeader">Profile Search</h3>

        {/* Search Input Section */}
        <section className="searchBarSection">
          <input
            type="text"
            placeholder="Search by name..."
            className="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="radioGroup">
            <label>
              <input
                type="radio"
                name="role"
                value="all"
                checked={roleFilter === "all"}
                onChange={() => setRoleFilter("all")}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={roleFilter === "student"}
                onChange={() => setRoleFilter("student")}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="tutor"
                checked={roleFilter === "tutor"}
                onChange={() => setRoleFilter("tutor")}
              />
              Tutor
            </label>
          </div>
        </section>

        {/* Loading / Error handling */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* People List Section */}
        <section className="profileSearchSubSec">
          <div className="scrollInner">
            <ul className="peopleList">
              {filteredPeople.map((person) => {
                // Optionally format each user line
                const name = person.name?.padEnd(15, " ") || "";
                const id = String(person.idNumber)?.padEnd(13, " ");
                const role = person.role || "";
                const line = `${name}${id}${role}`;

                return (
                  <li
                    key={person.idNumber}
                    className="personItem"
                    onClick={() => handleUserClick(person)} // <--- click handler
                    style={{ cursor: "pointer" }} // for clarity
                  >
                    <pre className="personName">{line}</pre>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Modal (conditionally rendered) */}
        {showModal && selectedUser && (
        <div className="modalBackdrop">
          <div className="modalContent">
            <h2>User Info</h2>

            {/* NEW – profile picture (round avatar) */}
            {selectedUser.profileImage && (
              <img
                src={selectedUser.profileImage}
                alt={`${selectedUser.name}'s profile`}
                className="modalAvatar"
                onError={(e) => {          // fallback if broken URL
                  e.target.src = "public/img/avatar-placeholder.png";
                }}
              />
            )}

            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>ID Number:</strong> {selectedUser.idNumber}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      </main>
    </main>
  );
}

export default ProfileSearch;
