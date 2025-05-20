import React, { useEffect, useState } from "react";
import "./AppointmentList.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlertDialog from "../../patient-component/patient-main/DeleteAppointmentModal";
import CustomizedDialogs from "../../patient-component/patient-main/UpdateAppointmentModal";


const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [apptDate, setApptDate] = useState("2022-10-01");
    const [apptStatus, setApptStatus] = useState("all");
  useEffect(() => {
    const fetchFullList = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/appointmentStat/appointmentFullList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appt_date: apptDate,
              appt_status: apptStatus,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch full appointment list");
        }
        const result = await response.json();
        setAppointments(result);
   
      } catch (error) {
        console.error("Error fetching full appt list trend:", error);
      }
    };
    fetchFullList();
  }, [apptDate, apptStatus]);
  return (
    <div className="appointments-container">
      <h1 className="appointments-title"><CalendarMonthIcon className="icons-appts"/>All Appointments</h1>
      <div className="appointments-filters">
        <label htmlFor="" className="label-date">
          Select start date
        </label>
        <input value={apptDate} onChange={(e)=>setApptDate(e.target.value)} type="date" className="filter-select" placeholder="start date" />
        <label htmlFor="" className="label-date">
          Select status
        </label>
        <select className="filter-select" onChange={(e)=>setApptStatus(e.target.value)} value={apptStatus}>
          <option value = "all">All</option>
          <option value = "Completed">Completed</option>
          <option value = "Canceled">Canceled</option>
          <option value = "Scheduled">Scheduled</option>
        </select>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.appt_id}</td>
                <td>{appointment.patient_fname}</td>
                <td>{appointment.appt_date.substring(0,10)}</td>
                <td>{appointment.appt_time}</td>
                <td>{appointment.appt_status}</td>
                <td><AlertDialog id = {appointment.appt_id}/>
                <CustomizedDialogs id={appointment.appt_id} /></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
