import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const AppointmentModal = ({
  showModal,
  date,
  time,
  docId,
  setShowModal,
}) => {
  const [reason, setReason] = useState("");
  const patientId = JSON.parse(localStorage.getItem("user"))?.patient_id;
  const onSubmit = async() => {
    setShowModal(false);
    try {
       const response=await axios.post(
        "http://localhost:5000/appointment/create_new_appointment",
        {
          date,
          time,
          docId,
          reason,
          patientId,
          status: "pending",
        }
      );
      if (response.status === 201) {
        // handleSubmit();
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      
    }
  };
  console.log("Date:", date);
  console.log("Time:", time);
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      // backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="reason"
              value={reason}
              onChange={(e)=>setReason(e.target.value)}
              placeholder="Describe your concern briefly"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentModal;
