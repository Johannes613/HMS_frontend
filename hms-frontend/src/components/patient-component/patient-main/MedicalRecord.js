import React from "react";
import "./MedicalRecord.css";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

import MedicalRecordTable from "./MedicalRecordTable";
function MedicalRecord() {
  return (
    <div className="patient-main-dashboard">
      <div className="patient-main-dashboard-header">
        <MedicalInformationIcon className="patient-main-dashboard-icon" />
        <h1>My Medical Records</h1>
      </div>
      <p>
        Welcome to the Patient Main Dashboard. Here you can view your medical
        history, schedule appointments, and manage your health records.
      </p>
      <MedicalRecordTable />
    </div>
  );
}

export default MedicalRecord;
