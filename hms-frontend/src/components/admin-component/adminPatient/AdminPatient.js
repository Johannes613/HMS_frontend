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
import TreatmentBarChart from "./TreatmentBarChart";
const AdminPatient = () => {
  const [patients, setPatients] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [year, setYear] = useState("2025");

  const [rows, setRows] = useState([]);
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [patientsByAge, setPatientsByAge] = useState([]);


  // const chartData = transformDataForChart(rawData);
  useEffect(() => {
    fetchPatients();
    fetchPatientsByAge();
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
        <div className="treatment-bar-chart">
          <h2>Different Treatment Procedures Over Months</h2>
          <div className="filter-by-year">
            <label htmlFor="" className="label-date">
              Select year
            </label>
            <select
              className="filter-select" 
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025" selected>2025</option>
            </select>
          </div>
          <TreatmentBarChart year={year} />
          <div className="chart-description">
            <p>
              This chart shows the distribution of patients by treatment
              procedures. The x-axis represents the month, while the y-axis
              represents the number of patients in each treatment procedure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPatient;
