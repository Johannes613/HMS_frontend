import React, { use, useEffect, useState } from "react";
import "./DoctorMain.css"; 
import doc_prof from "../../../images/doc_prof.png";
import DashboardIcon from '@mui/icons-material/Dashboard';


export default function DoctorMain() {
  const [data, setData] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [completedAppts, setCompletedAppts] = useState(0);
  const [canceledAppts, setCanceled] = useState([]);
  const [lastWeekAppts, setLastWeeksAppts] = useState(0);

  const viewPassedAppointment =  async () => {
      try {
        const response = await fetch('http://localhost:5000/appointmentStat/appointmentpassed');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        
       
        
      } catch (error) {
        console.error('Error fetching passed trend:', error);
      } 
    };
  
  useEffect(() => {
    const fetchAppointments= async () => {
      try {
        const response = await fetch('http://localhost:5000/appointmentStat/appointmentDetails',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            doc_id: 1
           }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        
       
        
      } catch (error) {
        console.error('Error fetching patient visit trend:', error);
      } 
    };
    
    

    const fetchTotalPatients= async () => {
      try{
        const response = await fetch('http://localhost:5000/appointmentStat/totalPatients');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log('Fetched data:', response);
        const result = await response.json();
        setTotalPatients(result[0].total_patients);
        console.log('Fetched data:', result[0].total_patients);
      }catch (error) {
        console.error('Error fetching patient number:', error);
      }
    }
    const fetchCompletedAppts= async () => {
      try{
        const response = await fetch('http://localhost:5000/appointmentStat/totalCompletedAppts');

        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log('Fetched data:', response);
        const result = await response.json();
        setCompletedAppts(result[0].count);
      }catch (error) {
        console.error('Error fetching  appts:', error);
      }
    }
    const fetchCanceledAppts= async () => {
      try{
        const response = await fetch('http://localhost:5000/appointmentStat/totalCanceledAppts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log('Fetched data:', response);
        const result = await response.json();
        setCanceled(result);
      }catch (error) {
        console.error('Error fetching cenecled:', error);
      }
    }
  
    const fetchLastWeekList= async () => {
      try{
        const response = await fetch('http://localhost:5000/appointmentStat/lastWeekAppts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log('Fetched data:', response);
        const result = await response.json();
        setLastWeeksAppts(result[0].count);
      }catch (error) {
        console.error('Error fetching  last week appts:', error);
      }
    }
    fetchAppointments();
    fetchTotalPatients();
    fetchCompletedAppts();
    fetchLastWeekList();
    fetchCanceledAppts();
   
  }, []);


  return(
     <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1><DashboardIcon className="icons-appts"/> Doctor Dashboard</h1>
          <div className="dashboard-profile">
           
            <img
              src={doc_prof}
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>

        <div className="grid-container">
          <div className="card appointments">
            <h2>Today's Appointments</h2>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                 {data.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patient_fname}</td>
                    <td>{appointment.appt_time}</td>
                    <td>{appointment.appt_status}</td>
                  </tr>
                ))}
              
              </tbody>
            </table>
          </div>

          <div className="card surgeries">
            <h2>Cancelled appointments</h2>
            <ul>
              {canceledAppts.map((appointment) => (
                <li>{appointment.appt_date.substring(0,10)} --- {appointment.reason}</li>
              ))
            }
            </ul>
              
            
          </div>
        </div>

        <div className="grid-container">
          <div className="card summary">
            <h2>Patient Summary</h2>
            <div className="summary-row">
              <div>
                <div className="summary-label">Total Patients</div>
                <div className="summary-value">{totalPatients}</div>
              </div>
              <div>
                <div className="summary-label">This Week's Visits</div>
                <div className="summary-value">{lastWeekAppts}</div>
              </div>
            </div>
          </div>

          <div className="card summary">
            <h2>Appointment Summary</h2>
            <div>
              <div className="summary-label">Completed Appointments</div>
              <div className="summary-value">{completedAppts}</div>
            </div>
          </div>

          <div className="card quick-actions">
            <h2>Quick Action</h2>
            <button className="action-button" onClick={viewPassedAppointment} style={{marginTop:20}}>View Passed Appoitments</button>
            <button className="action-button" style={{opacity:0}}>View Passed Appoitments</button>
          </div>
        </div>
      </div>
    </div>
  );
}
