import "./PatientMain.css";
import DataTable from "./DataTable";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function PatientMain() {
  return (
    <div className="patient-main-dashboard">
      <div className="patient-main-dashboard-header">
        <CalendarTodayIcon className="patient-main-dashboard-icon" />
        <h1>My Appointments</h1>
      </div>

      <p>
        Welcome to the Patient Main Dashboard. Here you can view your medical
        history, schedule appointments, and manage your health records.
      </p>
      <DataTable />
      {/* <div className="action-buttons">
        <button className="action-button">Request reschedule</button>
        <button className="action-button">Cancel Appointment</button>
      </div> */}
    </div>
  );
}
