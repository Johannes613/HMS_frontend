import React from "react";
import "./Premium.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Premium() {
  return (
    <div className="premium">
      <div className="container mt-5">
        <div className="row fac-head mb-5">
          <div className="col">
            <p className="tag px-3 mx-auto text-uppercase">Premium Plan</p>
            <h1 className="about-head">Choose Your Optimal Plan</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-9 mx-auto col-md-6 col-lg-4 px-lg-4 mb-4">
            <Card className="py-3 each-plan">
              <Card.Body>
                <Card.Title className="mb-3 fs-2 fw-semibold plan-type">
                  Standard
                </Card.Title>
                <Card.Title className="sec-title mb-3">
                  <span className="small-ad dol">$ </span>
                  <span className="amount-prem">59</span>
                  <span className="small-ad">/Monthly</span>
                </Card.Title>
                <Card.Text className="plan-details mb-5">
                  <ul className="tick-list fw-light">
                    <li>Basic health check-ups</li>
                    <li>General consultation access</li>
                    <li>Discounted lab tests</li>
                  </ul>
                  <ul className="color-red fw-light mt-2">
                    <li>Email support during working hours</li>
                    <li>Access to wellness guides</li>
                    <li>Limited appointment scheduling</li>
                  </ul>
                </Card.Text>
                <Link to="/shopping" className="nv-link text-uppercase  fw-medium">
                To Shopping
              </Link>
              </Card.Body>
            </Card>
          </div>

          <div className=" mx-auto col-9 col-md-6 col-lg-4 px-lg-4 mb-4">
            <Card className="py-3 each-plan prof-plan">
              <Card.Body>
                <Card.Title className="mb-3 fs-2 fw-semibold">
                  Professional
                </Card.Title>
                <Card.Title className="sec-title prof-plan mb-3">
                  <span className="small-ad dol">$ </span>
                  <span className="amount-prem">99</span>
                  <span className="small-ad">/Monthly</span>
                </Card.Title>
                <Card.Text className="plan-details mb-5 prof-plan">
                  <ul className="tick-list prof-li  fw-light">
                    <li>Comprehensive medical check-ups</li>
                    <li>Priority doctor appointments</li>
                    <li>Free annual diagnostic tests</li>
                    <li>24/7 chat and call support</li>
                  </ul>
                  <ul className="color-red fw-light mt-2">
                    <li>Access to fitness and diet plans</li>
                    <li>Specialist consultation discounts</li>
                  </ul>
                </Card.Text>
                <Link to="/shopping" id="prof-plan" className="nv-link text-uppercase  fw-medium">
                To Shopping
              </Link>
              </Card.Body>
            </Card>
          </div>

          

          <div className=" mx-auto col-9 col-md-6 col-lg-4 px-lg-4 mb-4">
            <Card className="py-3 each-plan">
              <Card.Body>
                <Card.Title className="mb-3 fs-2 fw-semibold plan-type">
                  Unlimited
                </Card.Title>
                <Card.Title className="sec-title mb-3">
                  <span className="small-ad dol">$ </span>
                  <span className="amount-prem">149</span>
                  <span className="small-ad">/Monthly</span>
                </Card.Title>
                <Card.Text className="plan-details mb-5">
                  <ul className="color-red fw-light mt-1">
                    <li>Custom meal and fitness plans</li>
                  </ul>
                  <ul className="tick-list fw-light">
                    <li>Unlimited doctor visits</li>
                    <li>Home visit consultations</li>
                    <li>Exclusive wellness retreats</li>
                    <li>Personal health advisor</li>
                    <li>Full mental health sessions</li>
                  </ul>
                </Card.Text>
                {/* <Button
                  variant="primary"
                  className="sub-btn mt-4 px-3 text-uppercase fw-medium"
                >
                  To Shopping +
                </Button> */}
                <Link to="/shopping" className="nv-link text-uppercase  fw-medium">
                To Shopping
              </Link>
              </Card.Body>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
