import React from "react";
import "./OurTeam.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { FaFacebook } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaGooglePlus } from "react-icons/fa";
import { teamMembers } from "./TeamsList";

export default function OurTeam() {
  return (
    <div className="our-team">
      <div className="container">
        <div className="row fac-head mb-3">
          <div className="col">
            <p className="tag px-2 mx-auto text-uppercase">Our Team</p>
            <h1 className="about-head">Meet Our Dedicated Professionals</h1>
            <p className="w-50 mx-auto lh-lg mt-3">
              Our team of experienced specialists is committed to providing
              top-quality care. They
              ensure the best treatment tailored to your needs.
            </p>
            <Button
          variant="primary"
          className="contact-btn mt-5 px-4 py-3 text-uppercase fw-medium"
        >
          Join Us +
        </Button>
          </div>
        </div>

        <div className="row pt-4">
          {teamMembers.map((member) => (
            <div className="col-sm-6 col-lg-4 mb-3 p-0" key={member.id}>
              <Card className="each-member border-0">
                <div className="img-container">
                  <Card.Img
                    variant="top"
                    src={member.image}
                    className="member-img mx-auto"
                  />
                  {/* <div className="overlay-team">
                    <FaFacebook className="social-icon-team" />
                    <FaTwitter className="social-icon-team" />
                    <FaGooglePlus className="social-icon-team" />
                  </div> */}
                </div>
                <Card.Body>
                  <Card.Title className="fs-3">{member.name}</Card.Title>
                  <Card.Text className="text-uppercase read-more-text">
                    {member.specialty}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
}
