import { use, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SignIn.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../../context/userContext";

function SignIn() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { userRole, setUserRole } = useUserContext();
  const { user, setUser } = useUserContext();
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const handleShow = () => setShow(true);
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoggedInUser({ ...loggedInUser, [name]: value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Perform sign-in logic here
    console.log("User Info:", loggedInUser);
    try {
      const response = await axios.post(
        "http://localhost:5000/four-six/login",
        loggedInUser
      );
      setLoading(false);
      if (response.status === 200) {
        console.log("User logged in successfully:", response.data);
        setUser(response.data);
        setUserRole(loggedInUser.userType);
        setIsLoggedIn(true);

        // Redirect to dashboard or show success message
        // navigate("/dashboard");
      } else {
        console.error("Error logging in user:", response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-5">
      <Button variant="primary" onClick={handleShow}>
        Sign In
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                name="email"
                onChange={handleInputChange}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                onChange={handleInputChange}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Login as
              </label>
              <select
                name="userType"
                id="login-as"
                className="form-select"
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <div className="mb-3">
            <a href="#" className="forgot-password-link">
              Forgot password?
            </a>
          </div>
          <div className="mb-3">
            <p>
              Don't have an account?{" "}
              <Link to="/sign-up" className="sign-up-link">
                Sign up
              </Link>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignIn;
