import React, { useEffect, useState } from "react";
import "./PatientList.css";
import GroupIcon from "@mui/icons-material/Group";


const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  useEffect(() => {
    const fetchFullList = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/appointmentStat/allPatients",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              age: ageGroup,
              gender: gender,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch full appointment list");
        }
        const result = await response.json();
        setPatients(result);
      } catch (error) {
        console.error("Error fetching full appt list trend:", error);
      }
    };
    fetchFullList();
  }, [ageGroup, gender]);
  return (
    <div className="appointments-container">
      <h1 className="appointments-title"><GroupIcon className="icons-appts" /> All Patients</h1>
      <div className="appointments-filters">
        <label htmlFor="" className="label-date">
          Select gendar
        </label>
        <select
          className="filter-select"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="all">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="" className="label-date">
          Select age group
        </label>
        <select
          className="filter-select"
          onChange={(e) => setAgeGroup(e.target.value)}
          value={ageGroup}
        >
          <option value="all">All</option>
          <option value="5">Greater than 5</option>
          <option value="15">Greater than 15</option>
          <option value="35">Greater than 35</option>
          <option value="50">Greater than 50</option>
          <option value="65">Greater than 65</option>
        </select>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Birth Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.patient_id}</td>
                <td>{patient.patient_fname}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.birth_date?.substring(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
