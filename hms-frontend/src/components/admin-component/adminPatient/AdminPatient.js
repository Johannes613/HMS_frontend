import React, { useEffect, useState } from "react";
import "./AdminPatient.css";
import "../../doctor-component/patient-list/PatientList.css";
import PatientDataTable from "./PatientDataTable";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";
import {

  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,

} from "recharts";
const AdminPatient = () => {
  const [patients, setPatients] = useState([]);

  const [rows, setRows] = useState([]);
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [patientsByAge, setPatientsByAge] = useState([]);
  const [patientsByGender, setPatientsByGender] = useState([]);
  useEffect(() => {
    fetchPatients();
    fetchPatientsByAge();
    // fetchPatientsByGender();
  }, [ageGroup, gender]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/four-six/patients",
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

  //const patients By age
  const fetchPatientsByAge = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/four-six/patients/age"
      );
      const data = response.data;
      console.log(data);
      const formattedData = data.map((item) => ({
        age: item.age,
        count: item.count,
      }));
      setPatientsByAge(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch patients grouped by gender
  // const fetchPatientsByGender = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/four-six/patients/by-gender"
  //     );
  //     const data = response.data;
  //     console.log(data);
  //     const formattedData = data.map((item) => ({
  //       gender: item.age,
  //       count: item.count,
  //     }));
  //     setPatientsByAge(formattedData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      <div className="chart-container">
       
        <div className="bar-chart-container">
          <h2>Patient Age Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientsByAge}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis dataKey="count" />
              <Tooltip />
              <Legend />
              <Bar dataKey="age" fill="#82ca9d" />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-description">
            <p>
              This chart shows the distribution of patients by age. The x-axis
              represents the age of the patients, while the y-axis represents
              the number of patients in each age group.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPatient;
