import React, { useEffect, useState } from "react";
import "./AppointmentList.css";
import AlertDialog from "../../patient-component/patient-main/DeleteAppointmentModal";
import CustomizedDialogs from "../../patient-component/patient-main/UpdateAppointmentModal";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ApptList = () => {
    const [fetchList,setFetch] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [apptDate, setApptDate] = useState("2022-10-01");
    const [apptStatus, setApptStatus] = useState("all");

    console.log("fetch from appt list->",fetchList)
  useEffect(() => {
    const fetchFullList = async () => {
      console.log("fetch fun called")
      try {
        const response = await fetch(
          "http://localhost:5000/appointmentStat/adminApptList",
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
  }, [apptDate, apptStatus,fetchList]);
  return (
    <div className="appointments-container">
      <h1 className="appointments-title"><CalendarMonthIcon className="icons-appts"/> All Appointments</h1>
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
          <option value = "Cancelled">Canceled</option>
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
              <tr key={appointment.appt_id}>
                <td>{appointment.appt_id}</td>
                <td>{appointment.patient_fname}</td>
                <td>{appointment.appt_date.substring(0,10)}</td>
                <td>{appointment.appt_time}</td>
                <td>{appointment.appt_status}</td>
                <td><AlertDialog id = {appointment.appt_id} fetchList = {fetchList} setFetch = {setFetch}/>
                <CustomizedDialogs id={appointment.appt_id} fetchList = {fetchList} setFetch = {setFetch} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApptList;
