import React, { useEffect, useState } from "react";
import "./AdminPatient.css";
import "../../doctor-component/patient-list/PatientList.css";
import PatientDataTable from "./PatientDataTable";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";

const AdminPatient = () => {
  const [patients, setPatients] = useState([]);

  const [rows, setRows] = useState([]);
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  useEffect(() => {
    fetchPatients();
  }, [ageGroup, gender]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/four-six/patients",
        {
          params: {
            age: ageGroup,
            gender: gender,
          },
        }
      );
      const data = response.data;
      console.log(data);
      const formattedData = data.map((item) => ({
        id: item.patient_id,
        firstName: item.patient_name,
        lastName: item.patient_name,
        age: item.age,
        gender: item.gender,
        phone: item.phone_num,
        email: item.email,
        birthdate: item.birth_date,
      }));
      setPatients(formattedData);
      setRows(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="patients-container">
      <div className="admin-patient-main-dashboard-header">
        <GroupIcon className="admin-patient-main-dashboard-icon" />
        <h1>All patients</h1>
      </div>
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
          <option value="male">Male</option>
          <option value="female">Female</option>
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

      {/* <div className="appointments-table-wrapper">
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
                <td>{patient.patient_name}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.birth_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <PatientDataTable rows={rows} />
    </div>
  );
};

export default AdminPatient;
