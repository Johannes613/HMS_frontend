import React from "react";
import "./EmailSub.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export default function EmailSub() {
  return (
    <div className="contact-us-ad m-0">
      <div className="container p-0 m-0">
        <div className="overlay-contact m-0 d-flex flex-column gap-4 align-items-center justify-content-center">
          <h2 className="about-head">
            Subscribe To Our Newsletter
          </h2>
          <Form className="d-flex gap-3">
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  className="form-cont py-2"
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Button
              variant="primary"
              className="contact-btn text-uppercase py-2 px-3  rounded-2"
            >
             Subscribe
            </Button>
            </Form>
            <p className="fs-5 fw-semibold">To Get 30% Discount</p>
        </div>
      </div>
    </div>
  );
}
