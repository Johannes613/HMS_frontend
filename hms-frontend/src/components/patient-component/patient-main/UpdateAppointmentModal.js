import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./MyDashboard.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ id, fetchList,setFetch}) {
  const [appointmentId, setAppointmentId] = React.useState(id);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    setOpen(false);
    try {
      const response = await axios.put(
        "http://localhost:5000/appointment/" + appointmentId,
        {
          date: date,
          time: time,
        }
      );
      console.log(response.data);
      setFetch(!fetchList);
      console.log("fetch from update->",fetchList)
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  
    

    
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        size="small"
        style={{ marginRight: 8 }}
        variant="contained"
        color="primary"
      >
        reschedule
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h3 className="reschedule-modal-h3">Reschedule Appointment</h3>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="update-appointment-form">
            <div className="form-group">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                style={{ marginLeft: "10px" }}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Select Time: </label>
              <input
                type="time"
                id="time"
                name="time"
                required
                style={{ marginLeft: "10px" }}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleUpdate}
            color="primary"
            variant="contained"
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
