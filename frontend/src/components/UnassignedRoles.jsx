import React from "react";
import "../styles/AuthRequest.css"

function HoursSection() {

    //list of people with ids here
    const people = [
        { id: 100112341, name: "John Doe" },
        { id: 100112342, name: "Jane Smith" },
        { id: 100112343, name: "Alice Johnson" },
        { id: 1001123451, name: "Bob Williams" },
        { id: 100112344, name: "John Doe" },
        { id: 100112345, name: "Jane Smith" },
        { id: 100112346, name: "Alice Johnson" },
        { id: 1001123471, name: "Bob Williams" },
        { id: 100112348, name: "John Doe" },
        { id: 100112349, name: "Jane Smith" },
        { id: 1001123450, name: "Alice Johnson" },
        { id: 100112323, name: "Bob Williams" },
        { id: 1001123454, name: "John Doe" },
        { id: 100114562, name: "Jane Smith" },
        { id: 100769209, name: "Alice Johnson" },
        { id: 100105800, name: "Bob Williams" },
        { id: 100000000, name: "John Doe" },
      ];

      return (
        <section className="authSubSectionContainer">
          {/* Top row with 3 columns: "Role Selection", "Student", "Tutor" */}
          <h2 className="roleSelectionHeader">
            {/* First column */}
            <span className="sectionTitle">Role Selection:</span>
    
            {/* Second column */}
            <span className="studentColumnHeader">Student</span>
    
            {/* Third column */}
            <span className="tutorColumnHeader">Tutor</span>
          </h2>
    
          {/* Scrollable list area */}
          <div className="scrollInner">
            <ul className="peopleList">
              {people.map((person) => (
                <li key={person.id} className="rolesRow">
                  {/* First column: Person's name & ID */}
                  <span className="personName">
                    {person.name} <br />
                    {person.id}
                  </span>
    
                  {/* Second column: Student radio */}
                  <input
                    type="radio"
                    name={`role-${person.id}`}
                    value="Student"
                  />
    
                  {/* Third column: Tutor radio */}
                  <input
                    type="radio"
                    name={`role-${person.id}`}
                    value="Tutor"
                  />
                </li>
              ))}
            </ul>
          </div>
    
          {/* Button stays below the scrollable area */}
          <button className="pill">Assign</button>
        </section>
      );
  }
  

export default HoursSection;