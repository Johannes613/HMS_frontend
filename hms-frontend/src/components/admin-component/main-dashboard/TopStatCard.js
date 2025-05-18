import React, { useEffect, useState } from "react";
import "./TopStat.css";

function TopStatCard() {
  const [departments, setDepartments] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);

  useEffect(() => {
    // Fetch Top Departments
    const fetchTopDepartments = async () => {
      try {
        const response = await fetch("http://localhost:5000/medicationData/topDepartments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching top departments:", error);
      }
    };

    // Fetch Top Doctors
    const fetchTopDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/medicationData/topDocs");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setTopDoctors(data);
      } catch (error) {
        console.error("Error fetching top doctors:", error);
      }
    };

    fetchTopDepartments();
    fetchTopDoctors();
  }, []);

  return (
    <div className="card-container" >
      <h3>Hospital Statistics</h3>
      <div className="cards-row">
        {/* Departments Card */}
        <div className="card-section">
          <h4>Top Departments by Revenue Generated</h4>
          <div className="cards">
            {departments.map((dept) => (
              <div key={dept.dept_id} className="stat-card">
                <h5>{dept.dept_name}</h5>
                <p><strong>Total Revenue:</strong> ${dept.total_cost.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors Card */}
        <div className="card-section">
          <h4>Top Doctors by Patients Seen (Past Year)</h4>
          <div className="cards">
            {topDoctors.map((doc) => (
              <div key={doc.doc_id} className="stat-card">
                <h5>Dr. {doc.doc_fname}</h5>
                <p><strong>Patients Seen:</strong> {doc.patient_count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopStatCard;
