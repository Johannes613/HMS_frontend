import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const insuranceProviders = [
  { id: 1, name: "Aetna Health Plan" },
  { id: 2, name: "BlueCross BlueShield" },
  { id: 3, name: "UnitedHealthcare" },
  { id: 4, name: "Cigna Global" },
  { id: 5, name: "Humana Medical" },
  { id: 6, name: "MetLife Health" },
  { id: 7, name: "Allianz Care" },
  { id: 8, name: "Aviva Health" },
  { id: 9, name: "AXA PPP Healthcare" },
  { id: 10, name: "Bupa Insurance" },
  { id: 11, name: "Delta Health" },
  { id: 12, name: "Etna Preferred Plan" },
  { id: 13, name: "Guardian Health" },
  { id: 14, name: "Sun Life Health" },
  { id: 15, name: "WellCare Insurance" },
  { id: 16, name: "Emirates Insurance" },
  { id: 17, name: "Daman Health Plus" },
  { id: 18, name: "Oman Insurance Company" },
  { id: 19, name: "Al Buhaira National" },
  { id: 20, name: "RSA Medical Plan" },
];

function CreatePatientModal({ show, onClose,setCreated }) {
  const [formData, setFormData] = useState({
    patient_fname: '',
    patient_lname: '',
    gender: '',
    age: '',
    phone_num: '',
    email: '',
    birth_date: '',
    insurance_id: '',
  });

  const handleChange = async(e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
  console.log("Handle submit called");
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/appointmentStat/addPatient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Read response body
    const data = await res.json();
    console.log("Response JSON:", data);

    if (res.ok) {
      alert('Patient added successfully!');
      setCreated(prev=>!prev)
      setFormData({
        patient_fname: '',
        patient_lname: '',
        gender: '',
        age: '',
        phone_num: '',
        email: '',
        birth_date: '',
        insurance_id: '',
      });
      onClose();
    } else {
      alert(data?.message || 'Failed to add patient');
    }
  } catch (err) {
    console.error('Server error:', err);
    alert('Server error');
  }
};

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Patient</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div 
            className="modal-body" 
            style={{ maxHeight: '400px', overflowY: 'auto' }} // scroll if content tall
          >
            {[
              ['patient_fname', 'First Name'],
              ['patient_lname', 'Last Name'],
              ['gender', 'Gender'],
              ['age', 'Age'],
              ['phone_num', 'Phone Number'],
              ['email', 'Email'],
              ['birth_date', 'Birth Date'],
            ].map(([id, label]) => (
              <div className="mb-3" key={id}>
                <label htmlFor={id} className="form-label">{label}</label>
                <input
                  type={
                    id === 'age'
                      ? 'number'
                      : id === 'birth_date'
                      ? 'date'
                      : id === 'email'
                      ? 'email'
                      : 'text'
                  }
                  className="form-control"
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="mb-3">
              <label htmlFor="insurance_id" className="form-label">Insurance Provider</label>
              <select
                id="insurance_id"
                className="form-select"
                value={formData.insurance_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Insurance Provider</option>
                {insuranceProviders.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Add Patient</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePatientModal;
