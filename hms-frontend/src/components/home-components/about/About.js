import React from "react";
import "./About.css";
import Button from "react-bootstrap/Button";
import left_img from "../../../images/asian-young-main-group-hospital-professional.jpg";

export default function About() {
  return (
    <div className="about">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-md-6 left-section">
            <img
              className="w-100 about-img"
              src={left_img}
              alt="Medical Team"
            />
          </div>
          <div className=" right-section col-md-6 text-center text-md-start">
            <p className="tag mt-md-0 mt-4">Who We Are</p>
            <h1 className="about-head my-2">Compassionate & Advanced Care</h1>
            <p className="mt-2 lh-lg">
              We provide top-quality healthcare with a patient-first approach,
              ensuring excellence through innovation and expertise.
            </p>
            <ul className="tick-list">
              <li>Specialized inpatient care</li>
              <li>Expert medical & surgical services</li>
              <li>Convenient outpatient treatment</li>
              <li>Modern equipment & medicine</li>
              <li>Comprehensive patient support</li>
              <li>Fast surgeries & easy booking</li>
            </ul>
            <Button variant="primary" className="mt-2 contact-btn px-4 py-3 text-uppercase">
              Read More +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
