import React from "react";
import "./ContactUsAd.css";
import { Link } from "react-router-dom";

export default function ContactUsAd() {
  return (
    <div className="contact-us-ad">
      <div className="container p-0 m-0">
        <div className=" row overlay-contact m-0 d-flex align-items-center">
          <h1 className="about-head col-sm-8  text-start ps-4">
            A great place of medical hospital center & health care
          </h1>
          <div className="col-sm-4 text-center">
            <Link to="/contact" className="nv-link text-uppercase  fw-medium">
                            Contact Us
                          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
