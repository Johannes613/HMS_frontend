import React, { useState } from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../images/log.png";
import SignIn from "../signIn/SignIn";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../../context/userContext";

export default function NavBar() {
  const { currentUser, numOfItems } = useState("");
  const { isLoggedIn } = useUserContext();
  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  return (
    <div className="nav-bar">
      <Navbar expand="lg" className="nav-boot bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link home">
              <img className="logo-img" src={logo} alt="Logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav text-center">
            <Nav className="gap-5 mx-auto ">
              <Link to="/" className="nav-link fw-medium">
                Home
              </Link>
              <Link to="/shopping" className="nav-link  fw-medium">
                Shopping
              </Link>
              <Link to="/contact" className="nav-link  fw-medium">
                Contact
              </Link>
              <Link to="/" className="nav-link  fw-medium">
                Testimonials
              </Link>
              <Link to="/" className="nav-link  fw-medium">
                Services
              </Link>
            </Nav>
            <div className="d-flex align-items-center justify-content-center gap-5">
              {currentUser ? (
                <Link to="/cart" className="nav-link">
                  {" "}
                  <IconButton>
                    <ShoppingCartIcon fontSize="small" />
                    <CartBadge
                      badgeContent={numOfItems}
                      color="primary"
                      overlap="circular"
                    />
                  </IconButton>
                </Link>
              ) : (
                <></>
              )}
              {isLoggedIn ? (
                <Link to="/dashboard" className="nav-link">
                  <Button variant="primary" className="to-dashboard">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <SignIn />
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
