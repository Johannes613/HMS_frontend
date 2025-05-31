import React, { act, useEffect, useState } from "react";
import patientImg from "../../../../assets/p1.png";
import "./PatientProfile.css";
import MyProfile from "./MyProfile";
import MedicalRecord from "../MedicalRecord";
import PatientMain from "../PatientMain";
import { useUserContext } from "../../../../context/userContext";
function PatientProfile() {
  const [activeTab, setActiveTab] = React.useState("profile");
    const [patientInfo,setPatientInfo] = useState(JSON.parse(localStorage.getItem("user")))
    const [isUpdated,setIsUpdated] = useState(false);
  useEffect(() => {
      setPatientInfo(JSON.parse(localStorage.getItem("user")));
    console.log(activeTab);
  }, [activeTab,isUpdated]);
  return (
    <div className="patient-profile-container">
      <div className="patient-profile">
        <div className="patient-profile-img-container">
          <img src={patientImg} alt="patient" className="patient-profile-img" />
          <h2>{patientInfo.patient_fname} {patientInfo.patient_lname}</h2>
        </div>

        <div className="tabs">
          <div className={activeTab === "profile" ? "tab active" : "tab"}>
            <h2 onClick={() => setActiveTab("profile")}>Profile</h2>
          </div>
          <div className={activeTab === "appoint" ? "tab active" : "tab"}>
            <h2 onClick={() => setActiveTab("appoint")}>Appointments</h2>
          </div>
          <div
            className={activeTab === "medical_history" ? "tab active" : "tab"}
          >
            <h2 onClick={() => setActiveTab("medical_history")}>
              Medical History
            </h2>
          </div>
        </div>
      </div>
      {/* dynamically load components here */}
      {activeTab === "profile" && <MyProfile isUpdated= {isUpdated} setIsUpdated = {setIsUpdated}  />}
      {activeTab === "appoint" && <PatientMain />}
      {activeTab === "medical_history" && <MedicalRecord />}
    </div>
  );
}

export default PatientProfile;
