import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import ProgressAnalytics from "./ProgressAnalytics";
import doc_prof from "../../../images/doc_prof.png";

export default function MainDashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
    const [completedAppts, setCompletedAppts] = useState(0);
    const [upcomingAppts, setUpcoming] = useState([]);
    const [lastWeekAppts, setLastWeeksAppts] = useState(0);
    const [medicalRecords, setMedicalRecords] = useState(0);
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
          // setData(result);
          
         
          
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
        const fetchMedicalRecords= async () => {
      try{
        const response = await fetch('http://localhost:5000/appointmentStat/fullMedicalRecord');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log('Fetched data:', response);
        const result = await response.json();
        setMedicalRecords(result[0].count);
      }catch (error) {
        console.error('Error fetching cenecled:', error);
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
      const fetchUpcomingAppts= async () => {
        try{
          const response = await fetch('http://localhost:5000/appointmentStat/totalUpcomingAppts');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          console.log('Fetched data:', response);
          const result = await response.json();
          setUpcoming(result[0].count);
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
      fetchUpcomingAppts();
      fetchMedicalRecords();
    }, []);
  
  
  const [clinicStats] = useState({
    name: "Yohannis Adamu",
    activePlan: "Clinic Premium Subscription",
    upcomingAppointments: 7,
    totalPatients: 120,
    treatedCases: 85,
    prescriptionsIssued: 65,
    successfulTreatments: 92,
    labReportsReviewed: 30,
    followUpsScheduled: 20,
    feedbackReceived: 15,
    testResultsUploaded: 10,
  });

  const [clinicPerformance] = useState({
    satisfactionScores: [
      { score: 95 },
      { score: 91 },
      { score: 93 },
    ],
    efficiencyScores: [
      { score: 88 },
      { score: 90 },
      { score: 87 },
    ],
  });

  const calculateAverage = (data, key) => {
    if (!data.length) return "No data available";
    const avg = data.reduce((sum, item) => sum + item[key], 0) / data.length;
    return `${avg.toFixed(2)}%`;
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1 style={{ color: "black" }}>Admin Dashboard</h1>
        <div className="dashboard-profile">
          <img src={doc_prof} alt="Profile" className="profile-image" />
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="dashboard-header">
        <div className="graph-wrapper">
          <ProgressAnalytics />
        </div>
      </div>

      {/* Usage Section */}
      <div className="usage-section">
        <div className="usage-header">
          <div className="usage-item">
            <p>Upcoming Appointments</p>
            <h3>{upcomingAppts}</h3>
          </div>
          <div className="usage-item">
            <p>Total Patients</p>
            <h3>{totalPatients}</h3>
          </div>
          <div className="usage-item">
            <p>Medical Records</p>
            <h3>{medicalRecords}</h3>
          </div>
          <div className="usage-item">
            <p>This Week's Visits</p>
            <h3>{lastWeekAppts}</h3>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-used"></div>
        </div>

        <div className="document-stats">
          <div className="stat-box">
            <p>Successful Treatments</p>
            <h4>{clinicStats.successfulTreatments}%</h4>
          </div>
          <div className="stat-box">
            <p>Lab Reports Reviewed</p>
            <h4>{clinicStats.labReportsReviewed}</h4>
          </div>
          <div className="stat-box">
            <p>Follow-ups Scheduled</p>
            <h4>{clinicStats.followUpsScheduled}</h4>
          </div>
          <div className="stat-box">
            <p>Patient Satisfaction</p>
            <h4>{calculateAverage(clinicPerformance.satisfactionScores, "score")}</h4>
          </div>
          <div className="stat-box">
            <p>Clinic Efficiency</p>
            <h4>{calculateAverage(clinicPerformance.efficiencyScores, "score")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
