import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
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
    field: "treatment",
    headerName: "Treatment Procedure",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 200,
  },
  {
    field: "diagnosis",
    headerName: "Diagnosis",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
];

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

export default function MedicalRecordTable() {
  const [rows, setRows] = useState([]);
  // fetch medical records from the backend
  useEffect(() => {
    fetchMedicalRecords();
  }, []);
  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/medicalRecord/1");
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
