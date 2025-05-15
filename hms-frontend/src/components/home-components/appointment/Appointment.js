import React from "react";
import left_img from "../../../images/thank-you-your-visit.jpg";
import Button from "react-bootstrap/Button";
import "./Appointment.css";
import Form from "react-bootstrap/Form";

export default function Appointment() {
  return (
    <div className="appointment">
      <div className="container mx-auto">
        <div className="row apt-cont p-3">
          <div className="col-lg-6 p-0 m-0 left-section">
            <img className="m-5 appt-img" src={left_img} alt="Medical Team" />
          </div>
          <div className="right-section my-auto col-lg-6 p-3 text-start">
            <form>
              <p className="tag mb-2">Appointment</p>
              <h1 className="fw-semibold my-2">
                Book Your Free Health Consultation Today
              </h1>
              <div className="form-sections d-flex gap-3 mb-2 mt-2">
                <Form.Control
                  className="inputs py-3"
                  size="lg"
                  type="text"
                  placeholder="Your Name"
                  required
                />
                <Form.Control
                  className="inputs py-3"
                  size="lg"
                  type="text"
                  placeholder="Gender"
                  required
                />
              </div>
              <div className="form-sections d-flex gap-3 mb-3">
                <Form.Control
                  className="inputs py-3"
                  size="lg"
                  type="tel"
                  placeholder="Phone Number"
                  required
                />
                <Form.Control
                  className="inputs py-3"
                  size="lg"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <Form.Control
                className="inputs py-2"
                as="textarea"
                rows={5}
                placeholder="Your Message"
                required
              />

              <Button
                variant="primary"
                className="contact-btn mt-4 px-4 py-3 text-uppercase"
                type="submit"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
