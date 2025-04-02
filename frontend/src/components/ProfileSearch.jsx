import React, {useState} from "react";
import "../styles/ProfileSearch.css"

function ProfileSearch() {

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    //list of people with ids here
    const people = [
        { id: 100112341, name: "John Doe", Role: "Student" },
        { id: 100112342, name: "Jane Smith", Role: "Student" },
        { id: 100112343, name: "Alice Johnson", Role: "Student" },
        { id: 1001123451, name: "Bob Williams", Role: "Student" },
        { id: 100112344, name: "John Doe", Role: "Student" },
        { id: 100112345, name: "Jane Smith", Role: "Student" },
        { id: 100112346, name: "Alice Johnson", Role: "Student" },
        { id: 1001123471, name: "Bob Williams", Role: "Student" },
        { id: 100112348, name: "John Doe", Role: "Student" },
        { id: 100112349, name: "Jane Smith", Role: "Student" },
        { id: 1001123450, name: "Alice Johnson", Role: "Student" },
        { id: 100112323, name: "Bob Williams", Role: "Student" },
        { id: 1001123454, name: "John Doe", Role: "Tutor" },
        { id: 100114562, name: "Jane Smith", Role: "Tutor" },
        { id: 100769209, name: "Alice Johnson", Role: "Tutor" },
        { id: 100105800, name: "Bob Williams", Role: "Tutor" },
        { id: 100000000, name: "John Doe", Role: "Tutor" },
        { id: 10011232367, name: "Bob Williams", Role: "Tutor" },
        { id: 100112345467, name: "John Doe", Role: "Tutor" },
        { id: 10011456267, name: "Jane Smith", Role: "Tutor" },
        { id: 10076920967, name: "Alice Johnson", Role: "Tutor" },
        { id: 10010580067, name: "Bob Williams", Role: "Tutor" },
        { id: 10000000067, name: "John Doe", Role: "Tutor" },
      ];

      const filteredPeople = people.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
                    checked={roleFilter === 'all'}
                    onChange={() => setRoleFilter('all')}
                  />
                  All
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={roleFilter === 'student'}
                    onChange={() => setRoleFilter('student')}
                  />
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="tutor"
                    checked={roleFilter === 'tutor'}
                    onChange={() => setRoleFilter('tutor')}
                  />
                  Tutor
                </label>
              </div>
            </section>
    
            {/* People List Section */}
            <section className="profileSearchSubSec">
              <div className="scrollInner">
                <ul className="peopleList">
                {people.map((person, index) => {
                    const name = `${person.name}`.padEnd(15, " ");
                    const id = `${person.id}`.padEnd(13, " ");
                    const role = `${person.Role}`;

                    const line = `${name}${id}${role}`;

                    return (
                        <li key={index} className="personItem">
                        <pre className="personName">{line}</pre>
                        </li>
                    );
                    })}
                </ul>
              </div>

            </section>
          </main>
        </main>
      );
  }
  

export default ProfileSearch;