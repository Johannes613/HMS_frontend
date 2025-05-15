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

const paginationModel = { page: 0, pageSize: 5 };

export default function PatientDataTable({ rows }) {
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [patientId, setPatientId] = React.useState(null);

  const handleRowSelection = (ids) => {
    setSelectedRowIds(ids);
    setPatientId(ids.length > 0 ? ids[0] : null); // assuming single selection
  };

  // handle patient update
  const handleUpdate = () => {
    if (patientId) {
      // Perform update logic here
      console.log("Updating patient with ID:", patientId);
    }
  };
  // handle patient delete
  const handleDelete = () => {
    if (patientId) {
      // Perform delete logic here
      console.log("Deleting patient with ID:", patientId);
    }
  };
  // handle patient add
  const handleAdd = () => {
    // Perform add logic here
    console.log("Adding new patient");
  };
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        onCellClick={(row) => setPatientId(row.id)}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        rowSelectionModel={selectedRowIds}
        sx={{
          border: 0,
          borderRadius: "10px",
          backgroundColor: "#fff",

          width: "100%",
        }}
      />
      <div className="action-buttons">
        <button className=" btn btn-primary action-btn" onClick={handleAdd}>
          Add Patient
        </button>
        <button
          className=" btn btn-primary action-btn"
          onClick={handleUpdate}
          disabled={!patientId}
        >
          Update
        </button>
        <button
          className=" btn btn-danger action-btn"
          disabled={!patientId}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Paper>
  );
}
