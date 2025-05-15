import React from "react";
import "./Hero.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { carouselSlides } from "./SlidesList";
import Card from "react-bootstrap/Card";
import icon1 from "../../../images/image copy 5.png";
import icon2 from "../../../images/image copy 6.png";
import icon3 from "../../../images/image copy 7.png";
import { FaPhone } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero position-relative w-100">
      <div className="container-fluid p-0">
        <Carousel fade>
          {carouselSlides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <img
                className="d-block w-100 vh-100"
                src={slide.image}
                alt={slide.title}
              />
              <div className="over-lay text-center text-md-start">
                <div className="content col-12 col-md-10 col-lg-7">
                  <p className="tag px-3">{slide.feature}</p>
                  <h1 className="">{slide.title}</h1>
                  <p className="mt-4 desc">{slide.description}</p>
                  <Button className=" contact-btn mt-4 px-4 py-3" variant="primary">
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="row row-over d-lg-flex d-none check justify-content-center w-100">
          <div className="col-3 each-info  ms-4 ">
            <Card className="each-info ps-3 pt-4 text-start d-flex flex-column gap-4">
              <Card.Img
                variant="top"
                className="w-25 ms-3 icon-img"
                src={icon1}
              />
              <Card.Body>
                <Card.Title className="card-title w-100">
                  Urgent Care Services
                </Card.Title>
                <Card.Text>
                  <p className="desc">
                    Our medical team is available 24/7 to handle any urgent
                    health situations. Feel free to reach out our doctors.
                  </p>
                  <div className="d-flex gap-3 flex-row mt-4 align-items-center">
                    <FaPhone className="phone-icon" />
                    <p className="my-auto">+971 543948653</p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div id="each-info" className="col-3 each-info  ms-4">
            <Card
              id="each-info"
              className="each-info ps-3 pt-4 text-start d-flex flex-column gap-4"
            >
              <Card.Img
                variant="top"
                className="w-25 ms-3 icon-img"
                src={icon2}
              />
              <Card.Body >
                <Card.Title className="card-title w-100">
                  Meet Our Doctors
                </Card.Title>
                <Card.Text className="mb-5">
                  <p className="desc">
                    Our specialists are available all the week.Please refer to
                    the schedule.Feel free to reach out our doctors.
                  </p>
                </Card.Text>
                <Link to="/contact" className="nv-link text-uppercase py-3  fw-medium">
                                Contact Us +
                              </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-3 each-info ms-4">
            <Card className="each-info ps-3 pt-4 text-start d-flex flex-column gap-4">
              <Card.Img
                variant="top"
                className="w-25 ms-3 icon-img"
                src={icon3}
              />
              <Card.Body>
                <Card.Title className="card-title w-100">
                  Clinic Hours
                </Card.Title>
                <Card style={{ border: "none" }}>
                  <ListGroup variant="flush" className="flush-mat">
                    <ListGroup.Item className="flush-mat d-flex justify-content-between pb-0 ps-0">
                      <p>Monday - Friday:</p>
                      <p>8:00 AM - 7:00 PM</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="flush-mat d-flex justify-content-between pb-0 ps-0">
                      <p>Saturday:</p>
                      <p>6:00 AM - 5:00 PM</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="flush-mat d-flex justify-content-between  pb-0 ps-0">
                      <p>Sunday:</p>
                      <p>9:00 AM - 4:00 PM</p>
                    </ListGroup.Item>
                    <ListGroup.Item className="flush-mat d-flex justify-content-between  pb-0 ps-0">
                      <p>Emergency:</p>
                      <p>24HRS, 7 Days</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
