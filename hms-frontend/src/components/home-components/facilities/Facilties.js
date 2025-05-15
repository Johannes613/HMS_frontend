import React from "react";
import "./Facilities.css";
import Card from "react-bootstrap/Card";
import { services } from "./FacilitiesList";

export default function Facilties() {
  return (
    <div className="facilities">
      <div className="container">
        <div className="row fac-head mb-5">
          <div className="col">
            <p className="tag px-3 mx-auto text-uppercase">
              Facilities we have
            </p>
            <h1 className="about-head">What Facilities We Provided</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-around g-3  mt-5">
          {services.map((service) => (
           <div key={service.id} className="col-md-6 col-lg-4 mb-4">
             <Card className="main-card">
              <Card.Img
                variant="top"
                className="main-img"
                src={service.image}
              />
              <Card.Body className="p-0 m-0 mt-3">
                <div className="d-flex flex-row justify-content-between w-100 m-0 p-0">
                  <div className="left-reader text-start">
                    <p className="head-serv p-0 m-1 ms-0">{service.category}</p>
                    <h4>{service.title}</h4>
                  </div>
                  <img src={service.icon} className="serv-icon" alt="" />
                </div>
              </Card.Body>
            </Card>
           </div>

          ))}
        </div>
      </div>
    </div>
  );
}
