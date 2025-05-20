import React, { useEffect, useState } from "react";
import "./AdminSupplier.css";
import axios from "axios";
import SupplierTable from "./SupplierTable.js";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "../../doctor-component/patient-list/PatientList.css";
import MedicationBetweenDatesTable from "./MedicationUsedBetweenDatesTable.js";
import SupplierWhoseItemStayedLongest from "./SupplierWhoseItemStayedLongest.js";
function AdminSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const allSuppliers = new Set();


  const [rows, setRows] = useState([]);
  const [gender, setGender] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [startDate, setStartDate] = useState("2025-04-01");
  const [supplierName, setSupplierName] = useState("Gulf Pharma");
  const [endDate, setEndDate] = useState("2025-04-15");
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
      allSuppliers.clear();
      data.map((item) => {
        allSuppliers.add(item.supplier_name);
      });
      setSuppliers(Array.from(allSuppliers));
      // setPatients(formattedData);
      setRows(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="admin-supplier-container">
      <SupplierWhoseItemStayedLongest />
      
      <SupplierTable rows={rows} />
      <div className="admin-supplier-main-dashboard-header medication-table">
        <div className="header-line">
          <LocalShippingIcon className="admin-supplier-main-dashboard-icon" />
          <h1>
            Manage Drug Used Between two given Dates and a Specific Supplier
          </h1>
        </div>

        <div className="appointments-filters">
          <label htmlFor="" className="label-date">
            Select supplier
          </label>
          <select
            className="filter-select"
            onChange={(e) => setSupplierName(e.target.value)}
            value={supplierName}
          >
            {suppliers.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor="" className="label-date">
            Select start date
          </label>
          <input
            type="date"
            className="filter-select"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
          <label htmlFor="" className="label-date">
            Select end date
          </label>
          <input
            type="date"
            className="filter-select"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
        </div>
        <div className="supplier-date-info">
          <h2>
            Supplied By: <span>{supplierName}</span>
          </h2>
          <h2>
            From: <span>{startDate}</span> To: <span>{endDate}</span>
          </h2>
        </div>
      </div>
      <MedicationBetweenDatesTable
        supplierName={supplierName}
        startDate={startDate}
        endDate={endDate}
      />
      <p className="admin-supplier-main-dashboard-paragraph">
        This Table shows medications supplied by a specific supplier that were
        used between two given dates, and list the patients who were prescribed
        those medications.
      </p>
    </div>
  );
}

export default AdminSupplier;
