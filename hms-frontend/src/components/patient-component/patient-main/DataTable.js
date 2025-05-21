import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import AlertDialog from "./DeleteAppointmentModal";
import CustomizedDialogs from "./UpdateAppointmentModal";
import "./DataTable.css";
import { useUserContext } from "../../../context/userContext";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "doctor",
    headerName: "Doctor",
    type: "text",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "cancel",
    headerName: "Action",
    width: 250,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <>
        <AlertDialog id={params.row.id} />
        <CustomizedDialogs id={params.row.id} />
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
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    fetchData();
  }, []);
  // fetch appointment data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/appointment/${user.patient_id}`
      );
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
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#e0f2fe",
            color: "#1976d2",
            fontWeight: "bold",
          },
        }}
        // sx={{ border: 0 }
        //  { "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5" } }}
      />
    </Paper>
  );
}
