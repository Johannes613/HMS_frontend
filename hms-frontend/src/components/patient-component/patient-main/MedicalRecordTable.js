import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import "./DataTable.css";
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
    field: "treatment",
    headerName: "Treatment Procedure",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 200,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "diagnosis",
    headerName: "Diagnosis",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
];

const paginationModel = { page: 0, pageSize: 5 };
export default function MedicalRecordTable() {
  const [rows, setRows] = useState([]);
  // fetch medical records from the backend
  useEffect(() => {
    fetchMedicalRecords();
  }, []);
  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get("http://localhost:3000/medicalRecord/1");
      const data = response.data;
      console.log(data);
      const formattedData = data.map((record, index) => ({
        id: index + 1,
        date: record.date.split("T")[0],
        firstName: record.patient_name,
        lastName: record.patient_name,
        doctor: record.doc_name,
        treatment: record.description,
        diagnosis: record.diagnosis,
      }));

      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
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
