import React from "react";
import "./Success.css";
import iconSucc from "../../../images/image copy 19.png";
import Button from "react-bootstrap/Button";

export default function Success() {
  return (
    <div className="success">
      <div className="container-fluid">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-6 py-5 px-2 left-success text-start">
            <div className="row">
              <p className="tag success-tag mt-5 text-center text-uppercase mb-3">
                Our Success
              </p>
              <h1 className="about-head text-start p-0 mt-3">
                Transforming Healthcare with Innovation
              </h1>
              <p className="mt-3">
                With a deep commitment to excellence, we have revolutionized
                patient care by integrating cutting-edge technology and
                compassionate service.
              </p>
            </div>

            <div className="info-success d-flex gap-3 my-5">
              <img
                src={iconSucc}
                className="icon-infection object-fit-cover"
                alt="Infection Prevention"
              />
              <div className="succ-detail">
                <h4>Advanced Medical Solutions</h4>
                <p>
                  Our technology-driven approach ensures accurate diagnostics,
                  efficient treatments, and improved patient outcomes.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-3 contact-btn me-auto px-4 py-3 text-uppercase"
            >
              Learn More +
            </Button>
          </div>

          {/* Right Side - Updated Stats */}
          <div className="col-md-6 right-success d-flex flex-column gap-5 justify-content-center">
            <div className="stat">
              <h2 className="about-head">1M+</h2>
              <p className="text-uppercase fw-semibold">patients treated</p>
            </div>
            <div className="stat">
              <h2 className="about-head">98%</h2>
              <p className="text-uppercase fw-semibold">success rate</p>
            </div>
            <div className="stat">
              <h2 className="about-head">200+</h2>
              <p className="text-uppercase fw-semibold">expert physicians</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
