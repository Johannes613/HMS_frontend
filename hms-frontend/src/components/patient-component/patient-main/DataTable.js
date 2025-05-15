import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import AlertDialog from "./DeleteAppointmentModal";
import CustomizedDialogs from "./UpdateAppointmentModal";

const columns = [
  { field: "date", headerName: "Date", width: 130 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "doctor",
    headerName: "Doctor",
    type: "text",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 130,
  },
  {
    field: "cancel",
    headerName: "Action",
    width: 250,
    renderCell: (params) => (
      <>
        <AlertDialog id={params.row.id}/>
        <CustomizedDialogs id={params.row.id} />
        {/* <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleReschedule(params.row.id)}
        >
          Reschedule
        </Button> */}
      </>
    ),
  },
];

const handleOpen = (id) => {
  console.log("Cancel appointment for:", id);
};
const handleReschedule = (id) => {
  console.log("Reschedule appointment for:", id);
};
// Here you can implement the logic to cancel the appointment

// Handle the action when the button is clicked

// const rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     date: "2025-01-01",
//     doctor: "Dr. Smith",
//     status: "Confirmed",
//   },
//   {
//     id: 2,
//     lastName: "Stark",
//     firstName: "Arya",
//     date: "2025-01-05",
//     doctor: "Dr. Grey",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     lastName: "Lannister",
//     firstName: "Tyrion",
//     date: "2025-01-08",
//     doctor: "Dr. Ford",
//     status: "Pending",
//   },
//   {
//     id: 4,
//     lastName: "Targaryen",
//     firstName: "Daenerys",
//     date: "2025-01-12",
//     doctor: "Dr. Quinn",
//     status: "Confirmed",
//   },
//   {
//     id: 5,
//     lastName: "Baratheon",
//     firstName: "Robert",
//     date: "2025-01-15",
//     doctor: "Dr. Strange",
//     status: "Completed",
//   },
//   {
//     id: 6,
//     lastName: "Mormont",
//     firstName: "Jorah",
//     date: "2025-01-18",
//     doctor: "Dr. House",
//     status: "Pending",
//   },
//   {
//     id: 7,
//     lastName: "Tyrell",
//     firstName: "Margaery",
//     date: "2025-01-20",
//     doctor: "Dr. Cox",
//     status: "Confirmed",
//   },
//   {
//     id: 8,
//     lastName: "Greyjoy",
//     firstName: "Theon",
//     date: "2025-01-22",
//     doctor: "Dr. Bailey",
//     status: "Completed",
//   },
//   {
//     id: 9,
//     lastName: "Sand",
//     firstName: "Obara",
//     date: "2025-01-25",
//     doctor: "Dr. Burke",
//     status: "Pending",
//   },
//   {
//     id: 10,
//     lastName: "Martell",
//     firstName: "Doran",
//     date: "2025-01-28",
//     doctor: "Dr. Wilson",
//     status: "Confirmed",
//   },
// ];
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // fetch appointment data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointment/1");
      const data = response.data;
      console.log(data);
      const formattedData = data.map((item, index) => ({
        id: item.appt_id,
        date: item.appt_date.split("T")[0], // Extract date from the string
        firstName: item.patient_name,
        lastName: item.patient_name,
        doctor: item.doc_name,
        status: item.status,
        // cancel: "Cancel Appointment", // Placeholder for action button
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
  
      <DataGrid
        // onCellClick={(row) => console.log(row.id)}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
