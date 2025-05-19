import React from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    birthDate: "",
    insuranceProvider: "",
    password: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Perform sign-up logic here
    console.log("User Info:", userInfo);
    try {
      const response = await axios.post(
        "http://localhost:5000/four-six/register-patient",
        userInfo
      );
      setLoading(false);
      if (response.status === 200) {
        console.log("User registered successfully:", response.data);
        // Redirect to dashboard or show success message
        navigate("/dashboard");
      } else {
        console.error("Error registering user:", response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page">
      <div className="container">
        <h2 className="text-center">Sign Up</h2>
        <p className="text-center">
          Create an account to access all features and services.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-group">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="fname"
              placeholder="Enter your name"
              name="firstName"
              value={userInfo.firstName}
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="lname"
              placeholder="Enter your name"
              name="lastName"
              value={userInfo.lastName}
            />
          </div>
          <div className="mb-3 ">
            <div className="radio-group">
              <label htmlFor="">Gender</label>
              <div className="radio-buttons">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={userInfo.email}
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              onChange={handleInputChange}
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              name="phone"
              value={userInfo.phone}
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="birthdate" className="form-label">
              Birth Date
            </label>
            <input
              onChange={handleInputChange}
              type="date"
              className="form-control"
              id="birthdate"
              placeholder="Enter your birth date"
              name="birthDate"
              value={userInfo.birthDate}
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="insurance-provide" className="form-label">
              Select Insurance Provider
            </label>
            <select
              className="form-select"
              id="insurance-provider"
              onChange={handleInputChange}
              name="insuranceProvider"
              value={userInfo.insuranceProvider}
            >
              <option value="provider1">Provider 1</option>
              <option value="provider2">Provider 2</option>
              <option value="provider3">Provider 3</option>
              <option value="provider4">Provider 4</option>
              <option value="provider5">Provider 5</option>
            </select>
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password "
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={userInfo.password}
            />
          </div>
          <button type="submit" className="btn btn-primary sign-up-btn">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
