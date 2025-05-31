import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingModal from "./BookingModal";
import "./DoctorsList.css";
import axios from "axios";
// import Modal from "react-modal";
// import { useForm } from "react-hook-form";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Modal.setAppElement("#root"); // Required for accessibility

export default function MyCalendar({ docId, setIsDoctorSelected }) {
  // const [events, setEvents] = useState([
  //   {
  //     title: "Doctor Appointment",
  //     start: new Date(2025, 5, 25, 10, 0),
  //     end: new Date(2025, 5, 25, 11, 0),
  //   },
  //   {
  //     title: "Follow-up Checkup",
  //     start: new Date(2025, 5, 26, 14, 0),
  //     end: new Date(2025, 5, 26, 15, 0),
  //   },
  //   {
  //     title: "Dental Appointment",
  //     start: new Date(2025, 5, 27, 9, 30),
  //     end: new Date(2025, 5, 27, 10, 30),
  //   },
  //   {
  //     title: "Physical Therapy",
  //     start: new Date(2025, 5, 28, 13, 0),
  //     end: new Date(2025, 5, 28, 14, 0),
  //   },
  //   {
  //     title: "Annual Checkup",
  //     start: new Date(2025, 5, 29, 11, 0),
  //     end: new Date(2025, 5, 29, 12, 0),
  //   },
  //   {
  //     title: "Vaccination Appointment",
  //     start: new Date(2025, 8, 30, 15, 0),
  //     end: new Date(2025, 8, 30, 16, 0),
  //   },
  //   {
  //     title: "Consultation",
  //     start: new Date(2025, 6, 1, 10, 0),
  //     end: new Date(2025, 6, 1, 11, 0),
  //   },
  //   {
  //     title: "Specialist Visit",
  //     start: new Date(2025, 6, 2, 14, 30),
  //     end: new Date(2025, 6, 2, 15, 30),
  //   },
  // ]);
  const [time, setTime] = useState();
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleSlotSelect = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setTime(slotInfo.start.toLocaleString().split(",")[1]);
    setDate(slotInfo.start.toLocaleString().split(",")[0]);
    //check if the slot is in the past
    if (slotInfo.start < new Date()) {
      alert("❌😁You cannot book an appointment in the past.");
      return;
    }
    setShowModal(true); // Extract date from the slot
    // Extract time from the slot
  };

  //fetch appointment details of the selected doctor
  const fetchDoctorCalendar = async (docId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/four-six/doctor-appointments/${docId}`
      );
      const events = response.data.map((appt) => {
        // Combine appt_date and time into a full datetime string
        const datePart = appt.appt_date.split("T")[0]; // "2025-05-31"
        const timePart = appt.time; // "10:00:00"
        const fullDateTimeString = `${datePart}T${timePart}`; // "2025-05-31T10:00:00"

        const start = new Date(fullDateTimeString);
        const end = new Date(start);
        end.setHours(start.getHours() + 1); // or custom duration

        return {
          id: appt.appt_id,
          title: `${appt.reason} (Status: ${appt.status})`,
          start,
          end,
        };
      });
      console.log("events: ", events);
      setAppointments(events);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEventSelect = (event) => {
    alert("This appointment is already booked.");
  };
  useEffect(() => {
    fetchDoctorCalendar(docId);
    console.log("from calendar: ", docId);
  }, [docId]);

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <div className="booking-calendar-header">
        <h2>Book Today,Talk to Your Doctor</h2>
        <p>
          Select a time slot to book an appointment with your doctor. You can
          also view and manage your existing appointments.
        </p>
      </div>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        date={currentDate}
        defaultView="week"
        views={["month", "week", "day"]}
        style={{ height: "80%" }}
        onNavigate={(date) => setCurrentDate(date)}
        min={new Date(2024, 0, 1, 9, 0)} // 9:00 AM
        max={new Date(2024, 0, 1, 23, 59)} // 11:59 PM (Midnight)
        step={60} // optional: 30-min slots
        workWeekStart={1} // Monday
        workWeekEnd={6} // Saturday
      />
      <BookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        time={time}
        date={date}
        docId={docId}
      />
    </div>
  );
}
