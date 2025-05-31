import React, { useEffect, useState } from "react";
import "./DoctorsList.css";
// Assuming you have a placeholder image
import doc_img from "../../../../../src/assets/doc_img.jpg";
import axios from "axios";
function DoctorsList({setDocId,setIsDoctorSelected}) {
  const [doctors, setDoctors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/four-six");
      setDoctors(response.data);
      console.log(response.data);
      console.log(doctors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, [searchResults]);
  useEffect(() => {
    console.log("Doctors updated:", doctors);
  }, [doctors]);
  //handle search functionality
  const handleSearch=(e)=>{
    const query = e.target.value.toLowerCase();
    setSearchResults(
      doctors.filter((doctor) =>
        `${doctor.doc_fname} ${doctor.doc_lname}`.toLowerCase().includes(query)
      )
    );
  }
  //handle filter functionality
  return (
    <div className="doctors-booking-list">
      <div className="booking-page-header">
        <h1>Book Appointment</h1>
        <p>Select a doctor to book an appointment</p>
      </div>
      <div className="booking-search-bar">
        <input type="text" placeholder="Search for doctors..." onChange={handleSearch}/>
        <button>Search</button>
      </div>
      <div className="list-of-doctors">
        <div className="row">
          {searchResults.length <= 0 && doctors?.map((doctor) => {
            return (
              <div className="col-md-3 col-lg-4" key={doctor.doc_id}>
                <div className="doctor-card">
                  <img src={doc_img} alt="Doctor" />
                  <h3>
                    Dr. {doctor.doc_fname} {doctor.doc_lname}
                  </h3>
                  <p>Cardiologist</p>
                  <button
                    onClick={() => {
                      console.log("Doctor Selected");
                      setIsDoctorSelected(true)
                      setDocId(doctor.doc_id)
                      console.log(doctor.doc_id);
                    }}
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            );
          })}
            {searchResults.length >0 && searchResults?.map((doctor) => {
            return (
              <div className="col-md-3 col-lg-4" key={doctor.doc_id}>
                <div className="doctor-card">
                  <img src={doc_img} alt="Doctor" />
                  <h3>
                    Dr. {doctor.doc_fname} {doctor.doc_lname}
                  </h3>
                  <p>Cardiologist</p>
                  <button
                    onClick={() => {
                      console.log("Doctor Selected");
                      setIsDoctorSelected(true)
                      setDocId(doctor.doc_id)
                      console.log(doctor.doc_id);
                    }}
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoctorsList;
