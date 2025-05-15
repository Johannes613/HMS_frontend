import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";

export default function AlertDialog({ id }) {
  const [open, setOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState(id);
  console.log(appointmentId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    try {
      const response = await axios.delete(
        "http://localhost:5000/appointment/" + appointmentId
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("Appointment deleted successfully");
        alert("Appointment deleted successfully");
        // Optionally, you can refresh the appointment list or perform any other action
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
     window.location.reload();
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        size="small"
        style={{ marginRight: 8 }}
      >
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          Are you sure you want to cancel this appointment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="info">
            This action cannot be undone. Please confirm that you want to cancel
            this appointment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            color="error"
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
