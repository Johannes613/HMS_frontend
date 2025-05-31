import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateDoctorModal({ show, onClose }) {
  const [formData, setFormData] = useState({
    doc_fname: '',
    doc_lname: '',
    phone_num: '',
    email: '',
    age: '',
    dept_id: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/appointmentStat/addDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Doctor added successfully!');
        setFormData({
          doc_fname: '',
          doc_lname: '',
          phone_num: '',
          email: '',
          age: '',
          dept_id: ''
        });
        onClose();
      } else {
        const errorData = await res.json();
        alert(errorData?.message || 'Failed to add doctor');
      }
    } catch (err) {
      console.error('Server Error:', err);
      alert('Server error');
    }
  };

  const departments = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Neurology' },
    { id: 3, name: 'Pediatrics' },
    { id: 4, name: 'Orthopedics' },
    { id: 5, name: 'Dermatology' },
    { id: 6, name: 'Radiology' },
    { id: 7, name: 'Oncology' },
    { id: 8, name: 'Gynecology' },
    { id: 9, name: 'Urology' },
    { id: 10, name: 'Ophthalmology' },
    { id: 11, name: 'ENT' },
    { id: 12, name: 'Anesthesiology' },
    { id: 13, name: 'Psychiatry' },
    { id: 14, name: 'General Surgery' },
    { id: 15, name: 'Emergency Medicine' },
    { id: 16, name: 'Endocrinology' },
    { id: 17, name: 'Gastroenterology' },
    { id: 18, name: 'Nephrology' },
    { id: 19, name: 'Pulmonology' },
    { id: 20, name: 'Rheumatology' }
  ];

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Doctor</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {['doc_fname', 'doc_lname', 'phone_num', 'email', 'age'].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label text-capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                  className="form-control"
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Department Dropdown */}
            <div className="mb-3">
              <label htmlFor="dept_id" className="form-label">Department</label>
              <select
                className="form-select"
                id="dept_id"
                value={formData.dept_id}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Add Doctor</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDoctorModal;
