import React, { useState } from "react";
import "./BookAppt.css";
import DoctorsList from "./DoctorsList";
import MyCalendar from "./DoctorCalendar";
function BookAppt() {
  const [isDoctorSelected, setIsDoctorSelected] = React.useState(false);
  const [doc_id,setDocId]=useState("")
  const [isBookingConfirmed, setIsBookingConfirmed] = React.useState(false);
  const handleDoctorClick = (doctor) => {
    // Logic to handle doctor selection
    console.log("Selected Doctor:", doctor);
  };
  return (
    <div>
      {isDoctorSelected ? <MyCalendar docId={doc_id} setIsDoctorSelected={setIsDoctorSelected}/> : <DoctorsList setDocId={setDocId} setIsDoctorSelected={setIsDoctorSelected}/>}
    </div>
  );
}

export default BookAppt;
