import React from "react";
import "./MyDashboard.css";
import profileImage from "../../../assets/p1.png";
import UpdateProfileModal from "./UpdateProfileModal";
function MyDashboard() {
  return (
    <div className="patient-main-dashboard">
      <h1 className="my-dashboard-h1">My Profile</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="user-profile-card">
            <div className="user-profile-img">
              <img src={profileImage} alt="UserProfile" />
            </div>
            <h2>Personal Information</h2>
            <p>
              Name: <span>John Doe</span>
            </p>
            <p>
              Gender: <span>Male</span>
            </p>
            <p>
              Email: <span>Indalu@gmail.com</span>
            </p>
            <p>
              Phone:<span>123-456-7890</span>{" "}
            </p>
            <p>
              Address:<span>123 Main St, City, Country</span>{" "}
            </p>
            <p>
              Primary Care Physician:<span>Dr. Smith</span>{" "}
            </p>
            <p>
              Physician Contact:<span>555-123-4567</span>{" "}
            </p>
            <p>
              Last Visit Date: <span>2023-10-01</span>
            </p>
            <div className="update-profile-button">
              <UpdateProfileModal />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="appointment-card">
            <h2>Upcoming Appointments</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023-10-15</td>
                  <td>Dr. Smith</td>
                  <td>Confirmed</td>
                  <td>
                    <button className="action-button">Cancel</button>
                  </td>
                </tr>
                <tr>
                  <td>2023-10-20</td>
                  <td>Dr. Johnson</td>
                  <td>Pending</td>
                  <td>
                    <button className="action-button">Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="action-buttons">
              <button className="action-button">View All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDashboard;
