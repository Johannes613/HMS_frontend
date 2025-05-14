import React, { useEffect, useState } from "react";
import "../patient-list/PatientList.css";

const MedicalRecordList = () => {
  const [records, setRecords] = useState([]);
  const [sortByPatientName, setSortByPatientName] = useState("");
  const [sortByRecId, setSortByRecId] = useState("");
  const [sortByPatientId, setSortByPatientId] = useState("");
  useEffect(() => {
    const fetchFullList = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/appointmentStat/allRecords",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rec_id: sortByRecId,
              patient_id: sortByPatientId,
              patient_name: sortByPatientName,
              
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch full appointment list");
        }
        const result = await response.json();
        setRecords(result);
      } catch (error) {
        console.error("Error fetching full appt list trend:", error);
      }
    };
    fetchFullList();
  }, [sortByRecId, sortByPatientName, sortByPatientId]);    
  return (
    <div className="appointments-container">
      <h1 className="appointments-title">All Medical Records</h1>
      <div className="appointments-filters">
        <label htmlFor="" className="label-date">
          Sort by patient name
        </label>
        <select
          className="filter-select"
          onChange={(e) => setSortByPatientName(e.target.value)}
          value={sortByPatientName}
        >
          <option value="">Default</option>
          <option value="patient_name asc">ASC</option>
          <option value="patient_name desc">DESC</option>
        </select>
        <label htmlFor="" className="label-date">
          Sort by patient id
        </label>
        <select
          className="filter-select"
          onChange={(e) => setSortByPatientId(e.target.value)}
          value={sortByPatientId}
        >
          <option value="">Default</option>
          <option value="patient_id asc">ASC</option>
          <option value="patient_id desc">DESC</option>
        </select>
        <label htmlFor="" className="label-date">
          Sort by record id
        </label>
        <select
          className="filter-select"
          onChange={(e) => setSortByRecId(e.target.value)}
          value={sortByRecId}
        >
          <option value="">Default</option>
          <option value="record_id asc">ASC</option>
          <option value="record_id desc">DESC</option>
        </select>
        
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Record ID</th> 
              <th>Patient ID</th> 
              <th>Patient Name</th>
              <th>Treatment Code</th>
              <th>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.record_id}</td>
                <td>{record.patient_id}</td>
                <td>{record.patient_name}</td>
                <td>{record.treatment_code}</td>
                <td>{record.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecordList;
