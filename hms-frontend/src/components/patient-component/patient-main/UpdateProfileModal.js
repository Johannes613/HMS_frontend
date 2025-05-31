import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import "./UpdateProfile.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto", // Scroll when content overflows
};

const genderOptions = ["Male", "Female", "Other"];
const insuranceOptions = [
  { id: 1, name: "Aetna Health" },
  { id: 2, name: "Blue Cross" },
  { id: 3, name: "Cigna" },
];

export default function UpdateProfileModal({isUpdated,setIsUpdated}) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    patient_fname: "",
    patient_lname: "",
    email: "",
    phone_num: "",
    age: "",
    birth_date: "",
    gender: "",
    insurance_id: "",
  });

  const handleOpen = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        patient_fname: storedUser.patient_fname || "",
        patient_lname: storedUser.patient_lname || "",
        email: storedUser.email || "",
        phone_num: storedUser.phone_num || "",
        age: storedUser.age || "",
        birth_date: storedUser.birth_date?.split("T")[0] || "",
        gender: storedUser.gender || "",
        insurance_id: storedUser.insurance_id || "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
      // handleClose();
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `http://localhost:5000/appointmentStat/updatePatient/${storedUser.patient_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
     
      console.log(response)
      
      if (response.ok) {
        // Update local storage with new user info
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify({ ...storedUser, ...formData }));
        alert("Profile updated successfully!");
        setIsUpdated(prev=>!prev);
        handleClose(); // Close modal
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" className="update-profile-button">
        Update Profile
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Update Profile
          </Typography>
          <div className="update-profile-form">
            <TextField
              fullWidth
              label="First Name"
              name="patient_fname"
              value={formData.patient_fname}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="patient_lname"
              value={formData.patient_lname}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone_num"
              value={formData.phone_num}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Birth Date"
              name="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              margin="normal"
              required
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Insurance Provider"
              name="insurance_id"
              value={formData.insurance_id}
              onChange={handleChange}
              margin="normal"
              required
            >
              {insuranceOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
