import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../../context/userContext";

function SignIn() {
  const navigate = useNavigate();
  const { userRole, setUserRole } = useUserContext();
  const { user, setUser } = useUserContext();
  const { isLoggedIn, setIsLoggedIn } = useUserContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "", // added to track password input
    userType: "",
  });

  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoggedInUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password, userType } = loggedInUser;

    if (!email || !password || !userType) {
      alert("Please fill in all fields.");
      return;
    }

    // Admin login (frontend check only — not for production)
    if (userType === "admin") {
      if (email === "admin@gmail.com" && password === "admin123") {
        setUserRole("admin");
        setUser("admin");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert("Invalid admin credentials.");
      }
      return; // don't fall through to backend call
    }

    // Regular user login
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/four-six/login", {
        email,
        password,
        userType,
      });

      if (response.status === 200) {
        setUser(response.data[0]);
        setUserRole(userType);
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-5">
      <Button variant="primary" onClick={handleShow}>
        Sign In
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="userType" className="form-label">
                Login as
              </label>
              <select
                name="userType"
                id="userType"
                className="form-select"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
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
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignIn;
