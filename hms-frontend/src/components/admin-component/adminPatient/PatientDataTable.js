import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "../../patient-component/patient-main/DataTable.css";

const columns = [
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
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "gender",
    headerName: "Gender",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "phone",
    headerName: "Phone",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "birthdate",
    headerName: "Birthdate",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function PatientDataTable({ rows }) {
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
