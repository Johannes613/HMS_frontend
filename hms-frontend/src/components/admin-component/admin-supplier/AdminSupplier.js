import React, { useEffect, useState } from "react";
import "./AdminSupplier.css";
import axios from "axios";
import SupplierTable from "./SupplierTable.js";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "../../doctor-component/patient-list/PatientList.css";
function AdminSupplier() {
  // const [supplier, setSupplier] = useState([]);

  const [rows, setRows] = useState([]);
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/suppliers");
      const data = response.data;
      console.log(data);
      const formattedData = data.map((item) => ({
        id: item.supp_id,
        firstName: item.supplier_name,
        lastName: item.supplier_name,
        // gender: item.gender,
        phone: item.phone_num,
        email: item.email,
        // birthdate: item.birth_date,
      }));
      // setPatients(formattedData);
      setRows(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="admin-supplier-container">
      <div className="admin-supplier-main-dashboard-header">
        <div className="header-line">
          <LocalShippingIcon className="admin-supplier-main-dashboard-icon" />
          <h1>All suppliers</h1>
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
      </div>

      <SupplierTable rows={rows} />
    </div>
  );
}

export default AdminSupplier;
