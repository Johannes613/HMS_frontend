import React from "react";
import "./Services.css";
import Card from "react-bootstrap/Card";
import { services } from "./ServicesList";




export default function Services() {
  return (
    <div className="services pt-5 mt-5">
      <div className="container-fluid">
        <div className="row fac-head mb-5">
          <div className="col">
            <p className="tag px-3 mx-auto text-uppercase">Our services</p>
            <h1 className="about-head">We Provide various Directions</h1>
          </div>
        </div>
        <div className="row g-0 mt-5 pt-5">
          {services.map((service) => (
            <div className="col-lg-4 col-xl-3 col-sm-6" key={service.id}>
              <Card className="pt-4 d-flex flex-column gap-2 each-services">
                <Card.Img
                  variant="top"
                  className="serv-icon mx-auto"
                  src={service.icon}
                />
                
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <p className="text-uppercase read-more-text">Read More +</p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
